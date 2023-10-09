import os
import json
from faker import Faker
import random
import base64

base_dir = 'layers/'
output_dir = 'collection/'

count = 0

sql_template = """
    INSERT INTO Asset (Asset_ID, Price, Keywords, image, Rarity)
    VALUES ({v1}, {v2}, "{v3}", "{v4}", {v5});
"""
# sql_statement = sql_template.format(v1=x, v2=x, v3=x, v4=x, v5=x)
# print(sql_statement)

fake = Faker()


def extract_objects(raw_svg: str):
    return raw_svg.replace('<svg viewBox="0 0 500 500"', '').replace(
        '</svg>', '').replace('<?xml version="1.0" encoding="utf-8"?>', '').replace('xmlns="http://www.w3.org/2000/svg">', '')


def combine_keys(*dicts):
    keys = []
    for d in dicts:
        if "keywords" in d:
            keys.extend(d["keywords"])
    return list(set(keys))


def gen_unique_rarity(*dicts):
    unique_rarity = 1.0
    for d in dicts:
        if 'rarity' in d:
            unique_rarity = unique_rarity * d['rarity']
    return unique_rarity


def combine_str(list):
    return ", ".join(list)


for file in set(files.split('.')[0] for files in os.listdir(base_dir + "background")):
    background_svg = extract_objects(
        open(f"{base_dir}background/{file}.svg", "r").read())
    background_json = json.loads(
        open(f"{base_dir}background/{file}.json", "r").read())

    for file in set(files.split('.')[0] for files in os.listdir(base_dir + "head")):
        head_svg = extract_objects(
            open(f"{base_dir}head/{file}.svg", "r").read())
        head_json = json.loads(open(f"{base_dir}head/{file}.json", "r").read())

        for file in set(files.split('.')[0] for files in os.listdir(base_dir + "ears")):
            ears_svg = extract_objects(
                open(f"{base_dir}ears/{file}.svg", "r").read())
            ears_json = json.loads(
                open(f"{base_dir}ears/{file}.json", "r").read())

            for file in set(files.split('.')[0] for files in os.listdir(base_dir + "brows")):
                brows_svg = extract_objects(
                    open(f"{base_dir}brows/{file}.svg", "r").read())
                brows_json = json.loads(
                    open(f"{base_dir}brows/{file}.json", "r").read())

                for file in set(files.split('.')[0] for files in os.listdir(base_dir + "eye")):
                    eye_svg = extract_objects(
                        open(f"{base_dir}eye/{file}.svg", "r").read())
                    eye_json = json.loads(
                        open(f"{base_dir}eye/{file}.json", "r").read())

                    for file in set(files.split('.')[0] for files in os.listdir(base_dir + "nose")):
                        nose_svg = extract_objects(
                            open(f"{base_dir}nose/{file}.svg", "r").read())
                        nose_json = json.loads(
                            open(f"{base_dir}nose/{file}.json", "r").read())

                        for file in set(files.split('.')[0] for files in os.listdir(base_dir + "mouth")):
                            mouth_svg = extract_objects(open(
                                f"{base_dir}mouth/{file}.svg", "r").read())
                            mouth_json = json.loads(
                                open(f"{base_dir}mouth/{file}.json", "r").read())

                            for file in set(files.split('.')[0] for files in os.listdir(base_dir + "hair")):
                                hair_svg = extract_objects(open(
                                    f"{base_dir}hair/{file}.svg", "r").read())
                                hair_json = json.loads(
                                    open(f"{base_dir}hair/{file}.json", "r").read())

                                count += 1

                                svg_image = f'<?xml version="1.0" encoding="utf-8"?><svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">{background_svg}{head_svg}{brows_svg}{eye_svg}{ears_svg}{nose_svg}{mouth_svg}{hair_svg}</svg>'
                                # SVG
                                oFile_svg = open(
                                    f"{output_dir}{count}.svg", "w")
                                oFile_svg.write(svg_image)
                                oFile_svg.close()

                                # JSON
                                oFile_json = open(
                                    f"{output_dir}{count}.json", "w")

                                title = fake.catch_phrase()

                                random_price = random.uniform(1, 10)
                                random_id = random.randint(1, 10000)
                                random_rarity = gen_unique_rarity(
                                    background_json, head_json, ears_json, brows_json, eye_json, nose_json, mouth_json, hair_json)
                                keys = combine_keys(
                                    background_json, head_json, ears_json, brows_json, eye_json, nose_json, mouth_json, hair_json)

                                oFile_json.write('{'+f'"title": "{title}","keywords": {json.dumps(list(set(keys)))},' +
                                                 f'"rarity": {random_rarity},'+f'"price": {random_price * random_rarity} '+'}')

                                with open("Insert_Assets.sql", 'a') as sql_file:
                                    location = f"/collection/{count}.svg"
                                    sql_file.write(sql_template.format(v1=count, v2=random_price, v3=combine_str(
                                        keys), v4=location, v5=random_rarity))


print(count)
