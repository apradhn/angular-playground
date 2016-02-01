#!/usr/bin/env python

import argparse
import requests
import csv
import pprint
import json


def get_sprite_urls(ids=range(1, 10)):
    sprites = list()
    domain = 'http://pokeapi.co/'
    for id in ids:
        url = domain + '/api/v1/pokemon/' + str(id)
        print 'GET ' + url
        res = requests.get(url).json()
        resource_uri = res['sprites'][0]['resource_uri']
        url = domain + resource_uri
        print 'GET ' + url
        res = requests.get(domain + resource_uri).json()
        image = res['image']
        sprites.append(domain + image)
    return sprites


def get_json():
    data = {'pokemon_names': [], 'pokemon': {}}
    with open('pokemon.csv', 'rb') as csvfile:
        reader = csv.reader(csvfile, delimiter=',')
        i = 0
        for row in reader:
            if i != 0:
                if int(row[0]) < 10000:
                    data['pokemon'][row[1]] = {'id': row[0], 'sprite': 'sprites/{}.png'.format(row[0]), 'name': row[1].capitalize()}
            i += 1
    with open('../public/pokemon.json', 'w') as json_file:
        json.dump(data, json_file)
    return data

if __name__ == '__main__':
    TARGET_CHOICES = [
        'json',
        'sprites'
    ]
    parser = argparse.ArgumentParser()
    parser.add_argument("-t", "--target", help="specific target", choices=TARGET_CHOICES)
    args = parser.parse_args()
    pp = pprint.PrettyPrinter(indent=4)

    if args.target == 'sprites':
        sprites = get_sprite_urls()
        print 'Done!'
        for s in sprites:
            pp.pprint(s)
    elif args.target == 'json':
        data = get_json()
        pp.pprint(data)
        print 'exported pokemon.csv to pokemon.json'
