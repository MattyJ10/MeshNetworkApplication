def chooseInterface():        
        import netifaces as ni
        chosenInterface='mesh0'
        for interface in ni.interfaces():
                print( str(interface))
                try:
                        ip = ni.ifaddresses(interface)[ni.AF_INET][0]['addr']
                        if '172.27.0.' in ip:
                                chosenInterface=interface
                except:
                        print( "eror reading interface")
                print( "chosen interface is "+str(chosenInterface))
        return chosenInterface
interface=chooseInterface()        
print "starting script"
import json
prioritizedict=dict()
with open('porttest1.json','r')as f:
    prioritizedict= json.load(f)
print json.dumps(prioritizedict)

prioritizelist=prioritizedict["prioritize"]
slowlist=prioritizedict["slow"]
print prioritizelist

for i in prioritizelist:
    print i

import os
import sys

os.system("sudo tc qdisc del dev "+interface+" root")
os.system("tc qdisc add dev "+interface+" root handle 1: htb default 30")
os.system("tc class add dev "+interface+" parent 1: classid 1:1 htb rate 6mbit burst 15k")
os.system("tc class add dev "+interface+" parent 1:1 classid 1:10 htb rate 5mbit burst 15k")
os.system("tc class add dev "+interface+" parent 1:1 classid 1:20 htb rate 3mbit ceil 6mbit burst 15k")
os.system("tc class add dev "+interface+" parent 1:1 classid 1:30 htb rate 10kbit ceil 10kbit burst 10k")
os.system("tc qdisc add dev "+interface+" parent 1:10 handle 10: sfq perturb 10")
os.system("tc qdisc add dev "+interface+" parent 1:20 handle 20: sfq perturb 10")
os.system("tc qdisc add dev "+interface+" parent 1:30 handle 30: sfq perturb 10")
os.system("tc filter add dev "+interface+" protocol ip parent 1: prio 1 u32 match ip dport 22 0xffff flowid 1:10")
os.system("tc filter add dev "+interface+" parent 1: protocol ip prio 1 u32 match ip dst 10.0.0.97 match ip dport 1234 0xffff flowid 1:30")

for i in prioritizelist:
    slowstring="tc filter add dev "+interface+" parent 1: protocol ip prio 2 u32 match ip dport "+i+" 0xffff flowid 1:10"
    os.system(slowstring)
    print slowstring

for i in slowlist:
    slowstring="tc filter add dev "+interface+" parent 1: protocol ip prio 2 u32 match ip dport "+i+" 0xffff flowid 1:30"
    os.system(slowstring)
    print slowstring
