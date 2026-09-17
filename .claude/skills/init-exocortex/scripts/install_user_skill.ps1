param(
  [string]$Source = (Split-Path -Parent $PSScriptRoot),
  [string]$DestinationRoot = (Join-Path $HOME '.agents\skills')
)

$destination = Join-Path $DestinationRoot 'init-exocortex'
$resolvedSource = (Resolve-Path -LiteralPath $Source).Path
New-Item -ItemType Directory -Force -Path $DestinationRoot | Out-Null
$staging = Join-Path $DestinationRoot '.init-exocortex.staging'
if (Test-Path -LiteralPath $staging) { Remove-Item -LiteralPath $staging -Recurse -Force }
New-Item -ItemType Directory -Force -Path $staging | Out-Null
Copy-Item -LiteralPath (Join-Path $resolvedSource 'SKILL.md') -Destination $staging
Copy-Item -LiteralPath (Join-Path $resolvedSource 'scripts') -Destination $staging -Recurse
if (Test-Path -LiteralPath $destination) { Remove-Item -LiteralPath $destination -Recurse -Force }
Move-Item -LiteralPath $staging -Destination $destination
Write-Output $destination

