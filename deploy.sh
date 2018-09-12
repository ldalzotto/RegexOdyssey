set -x

cd functions
sudo rm -r -d ./DatabaseOdyssey
sudo rm -r -d ./node_modules
sudo git clone https://github.com/ldalzotto/DatabaseOdyssey.git

sudo yarn install
sudo yarn deploy

