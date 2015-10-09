SOURCE_DIR=/home/davinod/Code/eclipse_dev_ws
DEST_DIR=/var/www/html
TEMP_DIR=/home/davinod/Code/eclipse_dev_ws/temp
PROJECT=LoginSample
TAR_NAME=build$PROJECT.tar.gz
CUR_DIR=$(pwd)

echo "Cleaning old tar files..."

rm $TEMP_DIR/$TAR_NAME
rm $DEST_DIR/$TAR_NAME
rm -rf $DEST_DIR/$PROJECT

echo "Building tar file...$SOURCE_DIR/$PROJECT"

cd $SOURCE_DIR
tar -zcvf $TEMP_DIR/$TAR_NAME ./$PROJECT

if [ $? -ne 0 ]; then 
	echo "Failed to create tar file."
	echo "Process canceled."
	cd $CUR_DIR
	exit 1
fi

echo "Moving tar file into $DEST_DIR"

sudo mv $TEMP_DIR/$TAR_NAME $DEST_DIR/$TAR_NAME

if [ $? -ne 0 ]; then
	echo "Failed to move tar file into $DEST_DIR/$TAR_NAME"
	echo "Process canceled."
	cd $CUR_DIR
	exit 1
fi

echo "Deploying $PROJECT ..."
echo "untaring $DEST_DIR/$TAR_NAME into $DEST_DIR"

cd $DEST_DIR
tar -zxvf ./$TAR_NAME -C ./

if [ $? -ne 0 ]; then
	echo "Failed to untar $DEST_DIR/$TAR_NAME into $DEST_DIR"
	echo "Process canceled."
	cd $CUR_DIR
	exit 1
fi

echo "Deployment succeed."
cd $CUR_DIR
exit 0
