# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
    # The most common configuration options are documented and commented below.
    # For a complete reference, please see the online documentation at
    # https://docs.vagrantup.com.
  
    # Every Vagrant development environment requires a box. You can search for
    # boxes at https://vagrantcloud.com/search.
    config.vm.box = "ubuntu/bionic64"
  
    # Disable automatic box update checking. If you disable this, then
    # boxes will only be checked for updates when the user runs
    # `vagrant box outdated`. This is not recommended.
    # config.vm.box_check_update = false
  
    # Create a forwarded port mapping which allows access to a specific port
    # within the machine from a port on the host machine. In the example below,
    # accessing "localhost:8080" will access port 80 on the guest machine.
    # NOTE: This will enable public access to the opened port
    config.vm.network "forwarded_port", guest: 3000, host: 3000
    config.vm.network "forwarded_port", guest: 8001, host: 8001


    #config.vm.network "forwarded_port", guest: 30052, guest_ip: "172.18.0.2", host: 30052
    

    #config.vm.network "forwarded_port", guest: 8081, host: 8081, host_ip: "127.0.0.1"
  
    # Create a forwarded port mapping which allows access to a specific port
    # within the machine from a port on the host machine and only allow access
    # via 127.0.0.1 to disable public access
    # config.vm.network "forwarded_port", guest: 80, host: 8080, host_ip: "127.0.0.1"
  
    # Create a private network, which allows host-only access to the machine
    # using a specific IP.
    # config.vm.network "private_network", ip: "192.168.33.10"
  
    # Create a public network, which generally matched to bridged network.
    # Bridged networks make the machine appear as another physical device on
    # your network.
    # config.vm.network "public_network"
  
    # Share an additional folder to the guest VM. The first argument is
    # the path on the host to the actual folder. The second argument is
    # the path on the guest to mount the folder. And the optional third
    # argument is a set of non-required options.
    # config.vm.synced_folder "../data", "/vagrant_data"
    #config.vm.synced_folder "./peregrine/config", "/etc/peregrine/conf.d/custom"
  
    # Provider-specific configuration so you can fine-tune various
    # backing providers for Vagrant. These expose provider-specific options.
    # Example for VirtualBox:
    #
     config.vm.provider "virtualbox" do |vb|
       # Display the VirtualBox GUI when booting the machine
       ##vb.gui = true
    
       # Customize the amount of memory on the VM:
       vb.memory = "6144"
       vb.cpus = "4"
      # vb.customize ["modifyvm", :id, "--vram", "48"]
      # vb.customize ["modifyvm", :id, "--graphicscontroller", "vboxvga"]
     end
    #
    # View the documentation for the provider you are using for more
    # information on available options.
  
    # Enable provisioning with a shell script. Additional provisioners such as
    # Puppet, Chef, Ansible, Salt, and Docker are also available. Please see the
    # documentation for more information about their specific syntax and use.
  
    #config.vm.provision "ScriptRunAsRoot", type:"shell", path: "Vagrantdata/rootUserBootstrap.sh"
    config.vm.provision "ScriptRunAsVagrantUser", privileged: false, type:"shell", path: "bootstrap.sh"    
    #config.vm.provision "shell", path: "bootstrap.sh"
    # Add Google Chrome repository
    ##config.vm.provision :shell, inline: "wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub|sudo apt-key add -"
    ##config.vm.provision :shell, inline: "sudo sh -c 'echo \"deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main\" > /etc/apt/sources.list.d/google.list'"

    # Update repositories
    ##config.vm.provision :shell, inline: "sudo apt update -y"

    # Upgrade installed packages
    ##config.vm.provision :shell, inline: "sudo apt upgrade -y"

    # Add desktop environment
    ##config.vm.provision :shell, inline: "sudo apt install -y --no-install-recommends ubuntu-desktop"
    ##config.vm.provision :shell, inline: "sudo apt install -y --no-install-recommends virtualbox-guest-dkms virtualbox-guest-utils virtualbox-guest-x11"
    # Add `vagrant` to Administrator
    ##config.vm.provision :shell, inline: "sudo usermod -a -G sudo vagrant"

    # Add Google Chrome
    ##config.vm.provision :shell, inline: "sudo apt install -y google-chrome-stable"

    # Add Chromium
    ##config.vm.provision :shell, inline: "sudo apt install -y chromium-browser"

    # Add Firefox
    ##config.vm.provision :shell, inline: "sudo apt install -y firefox"

    # Restart
    ##config.vm.provision :shell, inline: "sudo shutdown -r now"

  end
  