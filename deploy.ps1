#!/usr/bin/env pwsh
# ============================================================
#  deploy.ps1 - Deploy Hira CV Portfolio to Proxmox VM via SSH
#  Target: root@192.168.1.194 -> Docker container on port 8090
# ============================================================

$ErrorActionPreference = "Stop"

# ---- Configuration ----
$REMOTE_USER   = "root"
$REMOTE_HOST   = "192.168.1.194"
$REMOTE_SSH    = "$REMOTE_USER@$REMOTE_HOST"
$REMOTE_DIR    = "/opt/hira-cv"
$CONTAINER     = "hira-cv"
$IMAGE         = "hira-cv:latest"
$PORT          = 8091
$PROJECT_DIR   = $PSScriptRoot

# ---- Refresh PATH ----
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# ============================================================
#  STEP 1: Create tarball from git-tracked files
# ============================================================
Write-Host ""
Write-Host "[1/4] Empaquetando proyecto..." -ForegroundColor Cyan

$tarName = "hira-cv-deploy.tar.gz"
$tarPath = Join-Path $env:TEMP $tarName

Push-Location $PROJECT_DIR
try {
    & git add -A 2>$null
    $status = & git status --porcelain
    if ($status) {
        & git commit -m "chore: add Docker deployment files for Hira CV" --quiet
    }
    & git archive --format=tar.gz --prefix=hira-cv/ -o $tarPath HEAD
    if ($LASTEXITCODE -ne 0) { throw "git archive failed" }

    $sizeMB = [math]::Round((Get-Item $tarPath).Length / 1MB, 2)
    Write-Host "   Tarball creado: $tarName ($sizeMB MB)" -ForegroundColor Green
}
finally {
    Pop-Location
}

# ============================================================
#  STEP 2: Transfer to remote
# ============================================================
Write-Host ""
Write-Host "[2/4] Transfiriendo a $REMOTE_SSH ..." -ForegroundColor Cyan

& scp -o StrictHostKeyChecking=no $tarPath "${REMOTE_SSH}:/tmp/${tarName}"
if ($LASTEXITCODE -ne 0) { throw "scp failed" }
Write-Host "   Archivo transferido" -ForegroundColor Green

# ============================================================
#  STEP 3: Build Docker image on remote
# ============================================================
Write-Host ""
Write-Host "[3/4] Construyendo imagen Docker en el servidor..." -ForegroundColor Cyan

$buildCmd = "set -e && rm -rf $REMOTE_DIR && mkdir -p $REMOTE_DIR && tar -xzf /tmp/$tarName -C /opt/ && rm -f /tmp/$tarName && cd $REMOTE_DIR && docker build -t $IMAGE ."

& ssh -o StrictHostKeyChecking=no $REMOTE_SSH $buildCmd
if ($LASTEXITCODE -ne 0) { throw "Docker build failed" }
Write-Host "   Imagen construida: $IMAGE" -ForegroundColor Green

# ============================================================
#  STEP 4: Stop old container & start new one
# ============================================================
Write-Host ""
Write-Host "[4/4] Iniciando contenedor en puerto $PORT..." -ForegroundColor Cyan

$runCmd = "docker stop $CONTAINER 2>/dev/null; docker rm $CONTAINER 2>/dev/null; docker run -d --name $CONTAINER --restart unless-stopped -p ${PORT}:80 $IMAGE && docker image prune -f 2>/dev/null"

& ssh -o StrictHostKeyChecking=no $REMOTE_SSH $runCmd
if ($LASTEXITCODE -ne 0) { throw "Docker run failed" }

# ============================================================
#  Cleanup & Done
# ============================================================
Remove-Item $tarPath -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "================================================" -ForegroundColor Green
Write-Host "  Despliegue completado!" -ForegroundColor Green
Write-Host "  http://${REMOTE_HOST}:${PORT}" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Green
Write-Host ""
