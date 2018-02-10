#---DEPLOY BNA

composer runtime install --card PeerAdmin@hlfv1 --businessNetworkName autobkc-network

composer network start --card PeerAdmin@hlfv1 --networkAdmin admin --networkAdminEnrollSecret adminpw --archiveFile ./dist/autobkc-network.bna --file admin.card

composer card import --file admin.card

composer network ping --card admin@autobkc-network

composer-rest-server --card admin@autobkc-network -N never -w true
