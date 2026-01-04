---
title: Getting Started with Proxmox
description: A beginner's guide to setting up Proxmox Virtual Environment.
date: 2025-01-03
tags:
  - proxmox
  - virtualization
  - tutorial
order: 1
---

Proxmox Virtual Environment (VE) is a powerful open-source platform for running virtual machines and containers. This guide will walk you through the initial setup.

## Prerequisites

Before you begin, ensure you have:

- A dedicated machine or server
- At least 8GB RAM (16GB+ recommended)
- A 64-bit processor with virtualization support
- A USB drive for installation media

## Installation

> [!note]
> Always back up important data before installing a new operating system.

1. Download the Proxmox VE ISO from the [official website](https://www.proxmox.com/en/downloads).
2. Create a bootable USB drive using a tool like Balena Etcher.
3. Boot from the USB drive and follow the installation wizard.

## Initial Configuration

After installation, access the web interface at `https://your-server-ip:8006`.

> [!tip]
> Use the root account you created during installation to log in.

### Update the System

First, update your Proxmox installation:

```bash
apt update && apt full-upgrade -y
```

### Create Your First VM

1. Click "Create VM" in the top right
2. Follow the wizard to configure:
   - Name and VM ID
   - ISO image
   - System settings
   - Disk size
   - CPU and memory

> [!warning]
> Allocating too much memory to VMs can cause the host to become unstable.

## Next Steps

Now that you have Proxmox running, you might want to explore:

- Setting up containers with LXC
- Configuring storage pools
- Setting up backups
- Clustering multiple nodes

---

*This article is part of the [Infrastructure](/knowledge/stem/computer-science/infrastructure/) series.*
