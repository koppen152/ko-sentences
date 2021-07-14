import pandas as pd
import json

stuff = {
   'ChooseCupcakeF.wav': {'start': 0, 'length': 3.82},
   'ChooseGardenF.wav': {'start': 3.82, 'length': 3.76},
   'ChooseTableF.wav': {'start': 7.58, 'length': 3.84},
   'ChooseTshirtF.wav': {'start': 11.41, 'length': 3.66},
   'CutCupcakeCandle.wav': {'start': 15.06, 'length': 3.78},
   'CutCupcakeF.wav': {'start': 18.84, 'length': 3.75},
   'CutGardenF.wav': {'start': 22.59, 'length': 4.05},
   'CutGardenTree.wav': {'start': 26.64, 'length': 4.33},
   'CutTableF.wav': {'start': 30.97, 'length': 3.73},
   'CutTablePlate.wav': {'start': 34.70, 'length': 4.16},
   'CutTshirtBow.wav': {'start': 38.86, 'length': 4.21},
   'CutTshirtF.wav': {'start': 43.07, 'length': 4.04},
   'DryBunnyCarrot.wav': {'start': 47.11, 'length': 4.14},
   'DryBunnyF.wav': {'start': 51.24, 'length': 3.85},
   'DryMonkeyBanana.wav': {'start': 55.09, 'length': 4.2},
   'DryMonkeyF.wav': {'start': 59.29, 'length': 3.88},
   'DryPillowDinosaur.wav': {'start': 63.17, 'length': 4.67},
   'DryPillowF.wav': {'start': 67.84, 'length': 3.97},
   'DryStrollerDoll.wav': {'start': 71.81, 'length': 3.73},
   'DryStrollerF.wav': {'start': 75.53, 'length': 3.94},
   'FillerAskTrain.wav': {'start': 79.47, 'length': 3.21},
   'FillerBringPhone.wav': {'start': 82.69, 'length': 3.23},
   'FillerCountStripes.wav': {'start': 85.91, 'length': 3.04},
   'FillerFindOneWear.wav': {'start': 88.94, 'length': 3.28},
   'FillerGetFlower.wav': {'start': 92.22, 'length': 3.50},
   'FillerGiveTeddybear.wav': {'start': 95.72, 'length': 2.97},
   'FillerMakePencil.wav': {'start': 98.69, 'length': 3.77},
   'FillerMakeSnowman.wav': {'start': 102.45, 'length': 2.99},
   'FillerPutApples.wav': {'start': 105.44, 'length': 3.46},
   'FillerSayCheese.wav': {'start': 108.90, 'length': 3.4},
   'FillerShowBear.wav': {'start': 112.29, 'length': 2.91},
   'FillerTellHorse.wav': {'start': 115.20, 'length': 3.05},
   'FillerTouchFavoriteToy.wav': {'start': 118.25, 'length': 2.85},
   'FillerWashCars.wav': {'start': 121.1, 'length': 2.61},
   'FillerWhisperFavoriteColor.wav': {'start': 123.70, 'length': 3.6},
   'FillerWipeDesk.wav': {'start': 127.3, 'length': 3.95},
   'HugBunnyF.wav': {'start': 131.24, 'length': 3.84},
   'HugMonkeyF.wav': {'start': 135.08, 'length': 3.84},
   'HugPillowF.wav': {'start': 138.92, 'length': 4.01},
   'HugStrollerF.wav': {'start': 142.93, 'length': 3.71},
   'KnockonWindowF.wav': {'start': 146.64, 'length': 4.04},
   'KnockonWindowRainbow.wav': {'start': 150.68, 'length': 4.43},
   'LookatWindowF.wav': {'start': 155.10, 'length': 3.94},
   'PickBasketF.wav': {'start': 159.04, 'length': 3.57},
   'PickPresentF.wav': {'start': 162.61, 'length': 3.76},
   'PickRoosterF.wav': {'start': 166.37, 'length': 4.04},
   'SmashBasketF.wav': {'start': 170.41, 'length': 4.07},
   'SmashBasketGrape.wav': {'start': 174.47, 'length': 4.74},
   'SmashPresentF.wav': {'start': 179.21, 'length': 3.74},
   'SmashPresentRibbon.wav': {'start': 182.95, 'length': 4.18},
   'SmashRoosterF.wav': {'start': 187.13, 'length': 3.83},
   'SmashRoosterNest.wav': {'start': 190.95, 'length': 4.22}
}

df = pd.read_csv('info.txt', sep = '\t').drop(columns = ['text'])

# df['name'] = stuff.keys()

df = df.rename(columns = {'tmin': 'start', 'tmax': 'end'})

df['end'] = df['end'].diff()

df.loc[0, 'end'] = df.loc[1, 'start']

js = json.loads(df.to_json(orient = 'records'))

print(dict(zip(stuff.keys(), js)))