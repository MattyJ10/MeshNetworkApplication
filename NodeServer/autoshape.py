import pandas as pd
import json
import math
import os
def chooseInterface():        
        import netifaces as ni
        chosenInterface='wlp3s0'
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
data=dict()
with open('iplog172.27.0.82.json','r')as f:
  data= json.load(f)
print str(data)
datalist=[]
for key,val in data.iteritems():
    pdata=dict()
    print str(key)+" "+str(val['count'])
    pdata['ip']=key
    if 'length' in val:
        pdata['countlen']=val['count']*int(math.log(val['length']))
        pdata['count']=val['count']
        pdata['length']=val['length']
    else:
        pdata['count']=val['count']
        pdata['length']=0

    datalist.append(pdata)
print str(datalist)
os.system("tc qdisc add dev "+interface+" root handle 1: htb default 30")
os.system("tc class add dev "+interface+" parent 1: classid 1:1 htb rate 6mbit burst 15k")
os.system("tc class add dev "+interface+" parent 1:1 classid 1:10 htb rate 5mbit burst 15k")
os.system("tc class add dev "+interface+" parent 1:1 classid 1:20 htb rate 3mbit ceil 6mbit burst 15k")
os.system("tc class add dev "+interface+" parent 1:1 classid 1:30 htb rate 10kbit ceil 10kbit burst 10k")
for el in datalist:
    print el    
    if el['count']> el['length']:
          
        slowstring="tc filter add dev "+interface+" parent 1: protocol ip prio 2 u32 match ip dst "+el['ip']+" flowid 1:30"
        print slowstring
        os.system(slowstring)
        slowstring="tc filter add dev "+interface+" parent 1: protocol ip prio 2 u32 match ip src "+el['ip']+" flowid 1:30"
        print slowstring
        os.system(slowstring)


