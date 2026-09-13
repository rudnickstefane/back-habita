#!/bin/bash

# ----------------------------------
# Colors
# ----------------------------------
NOCOLOR='\033[0m'
RED='\033[0;31m'
GREEN='\033[0;32m'
ORANGE='\033[0;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
LIGHTGRAY='\033[0;37m'
DARKGRAY='\033[1;30m'
LIGHTRED='\033[1;31m'
LIGHTGREEN='\033[1;32m'
YELLOW='\033[1;33m'
LIGHTBLUE='\033[1;34m'
LIGHTPURPLE='\033[1;35m'
LIGHTCYAN='\033[1;36m'
WHITE='\033[1;37m'

setup() {
    read -p "Nome da aplicação (ex: Discount Program Rules): " APP_NAME;
    read -p "Descrição da aplicação (ex: Manages pharmaceutical benefit programs rules for the industry): " APP_DESCRIPTION;
    read -p "Código da aplicação (ex: discount-program-rules): " APP_CODE;

    echo -e "\n"
    echo "Valide as configuracoes abaixo para prosseguirmos."
    echo -e "Nome da aplicação: ${GREEN}$APP_NAME${NOCOLOR}"
    echo -e "Descrição da aplicação: ${GREEN}$APP_DESCRIPTION${NOCOLOR}"
    echo -e "Código da aplicação: ${GREEN}$APP_CODE${NOCOLOR}"
    echo -e "\n"

    while true; do
        read -p "As infomações acima estão corretas [y/N]?" yn
        case $yn in
            [Yy]* ) break;;
            [Nn]* ) exit;;
            * ) echo "Por favor, informe y para sim e n para não.";;
        esac
    done

    echo -e "${GREEN}Renomeando arquivos...${NOCOLOR}"
    grep -rl "Your\sapp\sname\shere" . --exclude-dir={node_modules,dist} | xargs sed -i "s/Your\sapp\sname\shere/${APP_NAME}/g"
    grep -rl "app-name-here" . --exclude-dir={node_modules,dist} --exclude=init.sh| xargs sed -i "s/app-name-here/${APP_CODE}/g"
    grep -rl "Your\sapp\sdescription\shere" . --exclude-dir={node_modules,dist} | xargs sed -i "s/Your\sapp\sdescription\shere/${APP_DESCRIPTION}/g"
    echo -e "${GREEN}Configurando backstage...${NOCOLOR}"
    cp -n catalog-info.example.yaml catalog-info.yaml
    sed -i '/TEMPLATE.md/d' ./mkdocs.yml
    rm -rf docs/TEMPLATE.md
    rm -rf catalog-info.example.yaml
    echo -e "\n${GREEN}Pronto! Você já pode usar seu repositório!${NOCOLOR}"
    echo -e "${ORANGE}Lembre-se de revisar os arquivos alterados antes de subir.${NOCOLOR}"
}

setup
