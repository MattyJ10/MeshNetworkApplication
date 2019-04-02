import pandas as pd
import json
import math

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
        #pdata['totalsize']=int((val['totalsize']))
    else:
        pdata['count']=val['count']

    datalist.append(pdata)
print str(datalist)
df = pd.DataFrame(datalist)
print (df)
plot1=df.plot(kind='bar',x='ip', y=['count','countlen','length'])
fig=plot1.get_figure()
fig.savefig("griplog172.27.0.82.png")
'''
print (df)
plot1=df.plot()
fig=plot1.get_figure()
fig.savefig("output.png")
'''
