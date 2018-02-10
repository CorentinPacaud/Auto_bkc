#composer network deploy -a ./dist/odm-network.bna -i PeerAdmin -s foounknown -p hlfv1 -A admin 

#composer network deploy -a ./dist/odm-network.bna --card PeerAdmin@hlfv1  -A admin -S adminpw 


composer runtime install --card PeerAdmin@hlfv1 --businessNetworkName autobkc-network

composer network start --card PeerAdmin@hlfv1 --networkAdmin admin --networkAdminEnrollSecret adminpw --archiveFile ./dist/autobkc-network.bna --file admin.card

composer card import --file admin.card

composer network ping --card admin@autobkc-network

composer-rest-server --card admin@autobkc-network -N never -w true

#composer-rest-server -p hlfv1 -n odm-poc-network -i admin -s adminpw -m true -networkAdminEnrollSecret adminpw
