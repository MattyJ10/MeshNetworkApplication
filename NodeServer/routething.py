import json
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
routetable=dict()
with open('routeinstr.json','r')as f:
   routetable= json.load(f)

print routetable 
number=1
tablenum=200

for key,val in routetable.iteritems():
    tablename="table"+str(tablenum)
    print key+" "+val
    iptablestring= "iptables -A PREROUTING -i " +str(interface) + " -t mangle -p tcp --dport "+key  +" -j MARK --set-mark "+str(number)
    print iptablestring
    os.system(iptablestring)
    tablestring="echo "+str(tablenum)+" "+tablename+" >> /etc/iproute2/rt_tables"
    print tablestring
    os.system(tablestring)
    rulestring="ip rule add fwmark "+ str(number) +" table "+ tablename
    print rulestring
    os.system(rulestring)
    routestring="/sbin/ip route add default via "+ str(val) +" dev "+ str(interface)+ " table "+tablename
    print routestring
    os.system(routestring)
    number=number+1
    tablenum=tablenum+1
