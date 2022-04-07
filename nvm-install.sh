#!/usr/bin/env bash
#
# https://github.com/creationix/nvm
#
DIR="$(cd $(dirname $0) ; pwd)"

# Error codes
ERROR_NVM_INSTALL_SHA=2

# Installer script from NVM repo
NVM_INSTALL_VERSION="v0.38.0"
NVM_INSTALL_URL="https://raw.githubusercontent.com/creationix/nvm/${NVM_INSTALL_VERSION}/install.sh"
NVM_INSTALL_SHA256="b674516f001d331c517be63c1baeaf71de6cbb6d68a44112bf2cff39a6bc246a"

echo "Node Version Manager"

case $(uname -s) in
  ( Darwin )
    ;;
  ( Linux )
    TMPDIR=/tmp
    ;;
esac

# Install NVM
function install_nvm() {
  if ! [ -f $HOME/.nvm/nvm.sh ] ; then
    echo "NVM: nvm is not installed."
    echo "NVM: installing..."
    NVM_INSTALL="$TMPDIR/nvm-${NVM_INSTALL_VERSION}-install.sh"
    printf "${NVM_INSTALL_SHA256}  $(basename ${NVM_INSTALL})\n" > ${NVM_INSTALL}.sha256
    curl -o $TMPDIR/nvm-${NVM_INSTALL_VERSION}-install.sh ${NVM_INSTALL_URL}

    if cd $TMPDIR && shasum -t -a 256 -c ${NVM_INSTALL}.sha256 --status ; then
      bash ${NVM_INSTALL}
    else
      echo "NVM ERROR: SHA-256 sum of NVM install script failed." 1>&2
      return ${ERROR_NVM_INSTALL_SHASUM}
    fi
  fi
}

install_nvm