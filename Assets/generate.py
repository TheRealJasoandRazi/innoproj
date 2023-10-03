import os
import json

base_dir = 'layers/'
output_dir = 'collection/'

count = 0


def extract_objects(raw_svg: str):
    return raw_svg.replace('<svg viewBox="0 0 500 500"', '').replace(
        '</svg>', '').replace('<?xml version="1.0" encoding="utf-8"?>', '').replace('xmlns="http://www.w3.org/2000/svg">', '')


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

                                oFile_svg = open(
                                    f"{output_dir}{count}.svg", "w")
                                oFile_svg.write(
                                    f'<?xml version="1.0" encoding="utf-8"?><svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">{background_svg}{head_svg}{brows_svg}{eye_svg}{ears_svg}{nose_svg}{mouth_svg}{hair_svg}</svg>')
                                oFile_svg.close()


print(count)
