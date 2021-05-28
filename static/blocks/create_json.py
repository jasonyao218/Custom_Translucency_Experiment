import json
from itertools import combinations
import random

data = {}

full_list = []
folders = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19']
objs = ['armadillo', 'buddha', 'bun', 'bunny', 'bust', 'cap', 'cube', 'dragon', 'lucy', 'star_smooth']
for folder in folders:
    for comb in combinations(objs, 2):
        full_list.append({
            'folder': folder,
            'object1': comb[0],
            'object2': comb[1]
        })

random.shuffle(full_list)
print(full_list)
with open('block0.txt','w') as output:
    json.dump(full_list[0:100], output)
with open('block1.txt','w') as output:
    json.dump(full_list[100:200], output)
with open('block2.txt','w') as output:
    json.dump(full_list[200:300], output)
with open('block3.txt','w') as output:
    json.dump(full_list[300:400], output)
with open('block4.txt','w') as output:
    json.dump(full_list[400:500], output)
with open('block5.txt','w') as output:
    json.dump(full_list[500:600], output)
with open('block6.txt','w') as output:
    json.dump(full_list[600:700], output)
with open('block7.txt','w') as output:
    json.dump(full_list[700:800], output)
with open('block8.txt','w') as output:
    json.dump(full_list[800:900], output)
# with open('block0.txt') as json_file:
#     data = json.load(json_file)
#     print(len(data))




