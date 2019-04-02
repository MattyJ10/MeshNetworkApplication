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
    for key1,val1 in val['protocol'].iteritems():
      pdata['ipprot']=key+key1
      pdata['count']=val1


      datalist.append(pdata)
print str(datalist)
df = pd.DataFrame(datalist)
print (df)
plot1=df.plot(kind='bar',x='ipprot', y='count')
fig=plot1.get_figure()
fig.savefig("protgriplog172.27.0.82.png")
'''
print (df)
plot1=df.plot()
fig=plot1.get_figure()
fig.savefig("output.png")
'''
