import traceback
import json
import pyshark
from collections import Counter
#cap = pyshark.LiveCapture(interface='wlan1')
#cap.sniff(packet_count=50)
import netifaces as ni
ni.ifaddresses('wlp3s0')
ip = ni.ifaddresses('wlp3s0')[ni.AF_INET][0]['addr']
print ip  # should print "192.168.100.37"
packetlog=dict();
userlog=dict();
storedlog=dict();
templog=dict();


import glob
for filename in glob.glob('iplog*'):
    print filename


    with open(filename,'r')as f:
     templog= json.load(f)
     print str(templog)
     #storedlog={x: storedlog.get(x,0)+templog.get(x,0) for x in set(storedlog).union(templog)}
     for key,val in templog.iteritems():


                if key in storedlog:
                    #try:
                        #print "doing addition "+str(storedlog[key])+" and "+str(val)
                        storedlog[key]['count']= storedlog[key]['count']+val['count']
                        for key1,val1 in val.iteritems():
                            if key1=='count': continue
                            if key1 in storedlog[key]:
                                storedlog[key][key1]['count']= storedlog[key][key1]['count']+val1['count']


                        #print "result is "+str(storedlog[key])
                    #except:
                        #print "error doing addition"
                        #exit()


                else:
                    print "adding new key to stored log"
                    storedlog[key]=val
    print "printing new log"
    print json.dumps(storedlog)

userlog=dict(storedlog)
#if ip in storedlog: userlog=storedlog[ip]
storedlogbackup=dict(storedlog)
#with open("datathing1.json",'r')as f:
#    userlog= json.load(f)

externpacketlog=dict()
#with open("externthing1.json",'r')as f:
#    externpacketlog= json.load(f)
#print json.dumps(userlog)
internpacketlog=dict()
#with open("internthing1.json",'r')as f:
#    internpacketlog= json.load(f)
#userlog=dict();
print json.dumps(storedlog);
#print json.dumps(userlog);
#print json.dumps(internpacketlog)
#print json.dumps(externpacketlog)
print "sniffing packets"
errorcount =0;
cap = pyshark.LiveCapture(interface='wlp3s0')
print "sniffed packets"
cap.sniff(packet_count=50)
for packet in cap:
    #print packet
    #print packet.highest_layer
    try:
       if 'tcp' in packet or 'udp' in packet:
         #print packet.highest_layer
         #print packet.tcp.dstport
         #print packet.ip.src

         try:
            if packet.ip.src in userlog:
                        print "adding to dict again "
                        #packetlog[packet.tcp.dstport] = 1+packetlog[packet.tcp.dstport];
                        print "added to user log "+str(packet.ip.src)+" "+str(userlog[packet.ip.src])
                        userlog[packet.ip.src]['count'] = userlog[packet.ip.src]['count']+1;

                        if packet.ip.dst in userlog[packet.ip.src]:
                                #userlog[packet.ip.src]+1;
                                print "incrementing user log before "+str(userlog[packet.ip.src][packet.ip.dst])
                                userlog[packet.ip.src][packet.ip.dst]['count']= userlog[packet.ip.src][packet.ip.dst]['count']+1;
                                print "incrementing user log after "+str(userlog[packet.ip.src][packet.ip.dst])
                        else:
                            userlog[packet.ip.src][packet.ip.dst]= dict();
                            userlog[packet.ip.src][packet.ip.dst]['count']= 1;

                        #if packet.ip.src== "172.27.0.90":
                        #if packet.ip.src == "172.27.0.90" or packet.ip.src== "172.27.0.155" or packet.ip.src == "172.27.0.15" or packet.ip.src=="172.27.0.227":
                            #internpacketlog[packet.ip.src] = internpacketlog[packet.ip.src]+1;
                        #else:
                            #externpacketlog[packet.ip.dst] = externpacketlog[packet.ip.dst]+1;

            else:
                        #print "adding to dict"
                        #packetlog[packet.tcp.dstport]=1;

                        #userlog[packet.ip.src]=1;
                        userlog[packet.ip.src]=dict()
                        userlog[packet.ip.src]['count']=1


         except:
            errorcount=errorcount+1;
            print "error with fields"
            print(traceback.format_exc())
            #print packet

    except:
        print "error "
        print(traceback.format_exc())
        #print packet

#print json.dumps(packetlog)
#import netifaces as ni
#ni.ifaddresses('wlan1')
#ip = ni.ifaddresses('wlan1')[ni.AF_INET][0]['addr']
#print ip  # should print "192.168.100.37"

savedLog= dict();
#storedlog=userlog;

print json.dumps(storedlogbackup)
print json.dumps(storedlog)
#print json.dumps(internpacketlog)
#print json.dumps(externpacketlog)


packetfile='iplog'+ip+'.json';
with open(packetfile,'w') as outfile:
    json.dump(userlog,outfile)
with open('datathing1.json','w') as outfile:
    json.dump(userlog,outfile)


import os
print "new val is"
os.system('cat '+packetfile)

print "\n\n\nold val is "+str(storedlog)

#os.system('cat internthing1.json')
#os.system('cat externthing1.json')
