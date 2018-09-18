set -x

DatabaseOdysseyTag="v0.0.2"

cd functions
sudo rm -r -d ./DatabaseOdyssey
sudo rm -r -d ./node_modules
sudo git clone https://github.com/ldalzotto/DatabaseOdyssey.git

if [ -z "$DatabaseOdysseyTag"]
then
  print "No tag"
else
  sudo git checkout tags/$DatabaseOdysseyTag
fi

sudo yarn install

cd ..
firebase deploy

