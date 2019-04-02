def chooseInterface():        
        import netifaces as ni
        chosenInterface='mesh0'
        for interface in ni.interfaces():
                print str(interface)
                try:
                        ip = ni.ifaddresses('wlp3s0')[ni.AF_INET][0]['addr']
                        if '172.27.0.' in ip:
                                chosenInterface=interface
                except:
                        print "eror reading interface"
                print "chosen interface is "+str(chosenInterface)
        return chosenInterface             

print chooseInterface()