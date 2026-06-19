"use strict";

const fs = require("node:fs");
const path = require("node:path");
const { execFile } = require("node:child_process");
const { promisify } = require("node:util");

const execFileAsync = promisify(execFile);

function parseVersionFromPath(executablePath) {
  const matches = String(executablePath || "").match(/\d+\.\d+\.\d+\.\d+/g);
  return matches && matches.length ? matches[matches.length - 1] : null;
}

function parseWmpfBuild(executablePath) {
  const match = String(executablePath || "").match(/[\\/]RadiumWMPF[\\/](\d+)[\\/]/i);
  return match ? Number(match[1]) : null;
}

function isWechatProcess(process) {
  return /^(Weixin|WeChat|WeChatAppEx|WeChatPlayer|crashpad_handler)\.exe$/i.test(
    String(process && process.name || ""),
  );
}

function isMiniProgramProcess(process) {
  const name = String(process && process.name || "");
  const commandLine = String(process && process.commandLine || "");
  return /WeChatAppEx\.exe/i.test(name)
    || /RadiumWMPF|wmpf-render-type|wmpf-appid|enable-applet/i.test(commandLine);
}

function isWechatWmpfRootProcess(process) {
  if (!process || !/WeChatAppEx\.exe/i.test(String(process.name || ""))) return false;
  const commandLine = String(process.commandLine || "");
  const executablePath = String(process.executablePath || "");
  if (/--type=|wmpf-render-type/i.test(commandLine)) return false;
  if (/product-id=1005/i.test(commandLine)) return false;
  return /product-id=1002|enable-applet|RadiumWMPF/i.test(`${commandLine} ${executablePath}`);
}

function selectWechatWmpfRootProcess(processes) {
  const list = Array.isArray(processes) ? processes : [];
  const candidates = list.filter(isWechatWmpfRootProcess);
  return candidates.find((item) => /product-id=1002/i.test(String(item.commandLine || "")))
    || candidates.find((item) => /enable-applet/i.test(String(item.commandLine || "")))
    || candidates[0]
    || null;
}

async function readWindowsProcesses() {
  const script = [
    "$ErrorActionPreference='SilentlyContinue'",
    "$items=Get-CimInstance Win32_Process | Where-Object {",
    "  $_.Name -match '^(Weixin|WeChat|WeChatAppEx|WeChatPlayer|crashpad_handler)\\.exe$'",
    "  -or $_.ExecutablePath -match 'Weixin|WeChat|RadiumWMPF'",
    "}",
    "$items | Select-Object Name,ProcessId,ParentProcessId,ExecutablePath,CommandLine | ConvertTo-Json -Compress -Depth 3",
  ].join("; ");
  const { stdout } = await execFileAsync(
    "powershell.exe",
    ["-NoProfile", "-NonInteractive", "-Command", script],
    { encoding: "utf8", windowsHide: true, maxBuffer: 4 * 1024 * 1024 },
  );
  const text = String(stdout || "").trim();
  if (!text) return [];
  const parsed = JSON.parse(text);
  const list = Array.isArray(parsed) ? parsed : [parsed];
  return list.map((item) => ({
    name: item.Name || "",
    pid: Number(item.ProcessId) || 0,
    parentPid: Number(item.ParentProcessId) || 0,
    executablePath: item.ExecutablePath || "",
    commandLine: item.CommandLine || "",
  }));
}

function getFileVersion(executablePath) {
  if (!executablePath || !fs.existsSync(executablePath)) return null;
  return parseVersionFromPath(executablePath);
}

async function discoverWechatEnvironment(options = {}) {
  const logger = options.logger || null;
  let processes = [];
  let failureReason = null;
  try {
    processes = process.platform === "win32" ? await readWindowsProcesses() : [];
  } catch (error) {
    failureReason = String(error instanceof Error ? error.message : error);
  }

  const wechatProcesses = processes.filter(isWechatProcess);
  const miniProgramProcesses = processes.filter(isMiniProgramProcess);
  const main = wechatProcesses.find((item) => /^(Weixin|WeChat)\.exe$/i.test(item.name))
    || wechatProcesses[0]
    || null;
  const runtime = selectWechatWmpfRootProcess(miniProgramProcesses)
    || miniProgramProcesses.find((item) => /WeChatAppEx\.exe/i.test(item.name))
    || null;
  const installPath = main && main.executablePath
    ? path.dirname(main.executablePath)
    : null;
  const wechatVersion = parseVersionFromPath(
    wechatProcesses.map((item) => `${item.executablePath} ${item.commandLine}`).join(" "),
  ) || getFileVersion(main && main.executablePath);
  const wmpfBuild = parseWmpfBuild(runtime && runtime.executablePath);

  if (logger) {
    logger.info(wechatProcesses.length ? "wechat_process_found" : "wechat_process_missing", {
      count: wechatProcesses.length,
      version: wechatVersion,
      installPath,
    });
    if (miniProgramProcesses.length) {
      logger.info("miniprogram_process_found", {
        count: miniProgramProcesses.length,
        wmpfBuild,
      });
    }
  }

  return {
    platform: process.platform,
    wechatVersion,
    installPath,
    wmpfBuild,
    wechatProcesses,
    miniProgramProcesses,
    failureReason,
  };
}

module.exports = {
  discoverWechatEnvironment,
  isMiniProgramProcess,
  isWechatWmpfRootProcess,
  isWechatProcess,
  parseVersionFromPath,
  parseWmpfBuild,
  selectWechatWmpfRootProcess,
};
