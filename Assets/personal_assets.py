usrID = 10001
assetCount = 0

with open("Insert_Personal_Asset.sql", "w") as File:
    for assetID in range(1, 3841):
        assetCount += 1
        if assetCount <= 192:
            File.write(F"INSERT INTO Personal_Assets(PersonalAssetID, Asset_ID, Account_ID) VALUES({assetID}, {assetID}, {usrID});")
        else: 
            usrID += 1
            assetCount = 0


