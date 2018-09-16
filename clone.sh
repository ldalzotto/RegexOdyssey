set -x

DatabaseOdysseyTag="v0.0.1"

cd functions
sudo rm -r -d ./DatabaseOdyssey
sudo rm -r -d ./node_modules
sudo git clone https://github.com/ldalzotto/DatabaseOdyssey.git
sudo git checkout tags/$DatabaseOdysseyTag

sudo yarn install

