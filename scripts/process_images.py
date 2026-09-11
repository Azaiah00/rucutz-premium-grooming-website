"""Curate + process RuCutz source photos into responsive WebP.
Sources: Ru's Instagram (@rucutz_), his Yelp listing, his Salon Lofts profile.
Run: python3 scripts/process_images.py  (reads /home/claude/raw, writes public/img + src/data/photos.json)
"""
import json, glob, os
from PIL import Image, ImageOps

RAW = '/home/claude/raw'
OUT = '/home/claude/rucutz/public/img'
os.makedirs(OUT, exist_ok=True)

def src(k):
    if k.startswith('y'):
        return glob.glob(f'{RAW}/yelp/{k[1:]}_*.jpg')[0]
    return glob.glob(f'{RAW}/ig/{k}_*.jpg')[0]

# key, source, crop(x0,y0,x1,y1 fractions) or None, tags, alt
PHOTOS = [
 # --- hero / feature ---
 ('hero-taper-beard','016',None,['fades','beards'],'Taper fade with a full natural top and a sculpted full beard, side profile, cut by Ru at RuCutz Premium Grooming'),
 ('waves-temple','034',None,['waves'],'Close-up of deep 360 waves meeting a razor-sharp temple line'),
 ('ru-portrait','089',(0,0,1,1),['about'],'Heru "Ru" Ward, owner and barber of RuCutz Premium Grooming, standing on tiled steps'),
 ('ru-kay','025',(0,0.04,1,0.74),['about'],'Ru and Kay of Kay Pro Styles smiling together inside their shared suite'),
 ('ru-at-work','036',None,['experience','locs'],'Ru detailing a loc client\'s hairline with a trimmer inside the suite'),
 ('ru-cutting','148',(0,0.34,1,1),['experience'],'Ru lining up a client\'s beard with a trimmer'),
 # --- ritual / services ---
 ('ritual-wash','124',(0,0.40,1,1),['experience'],'Client reclined at the shampoo bowl during a deep-cleansing hair wash'),
 ('ritual-razor','079',(0.2,0.2,1,1),['experience','beards'],'Straight-razor detail work over a hot towel during the Distinguished Experience'),
 ('ritual-towel','105',None,['experience','beards'],'Client relaxing with eyes closed as Ru shapes his beard with a trimmer, a towel across his chest'),
 ('ritual-scent','041',(0,0.36,1,1),['experience'],'Hand holding a bottle of City Rhythm 2654 extrait de parfum, the kind of scent used for the Signature Scent finish'),
 ('client-smile','031',None,['experience'],'Smiling client in the RuCutz cape after his cut'),
 ('client-laugh','131',(0,0,1,0.64),['experience','locs'],'Client with locs laughing in the chair during his appointment'),
 ('svc-king','021',None,['fades'],'Taper fade on a textured crop, rear three-quarter view'),
 ('svc-prince','y05',None,['kids','waves'],'Young client showing fresh 360 waves and a clean taper'),
 ('svc-edgeup','023',None,['fades'],'Sharp line-up and close fade, client looking down'),
 ('svc-edgeup-enh','159',None,['waves'],'Crisp enhanced hairline with 360 waves and a low fade'),
 ('svc-afterhours','045',None,['fades'],'High fade and lined temple in front of the suite\'s neon OPEN sign'),
 ('bigchop-before','069',(0.43,0.06,1,0.94),['transformations','locs'],'Before: long locs held up just before a big chop'),
 ('bigchop-after','067',(0,0.30,1,1),['transformations','waves'],'After: the same client with a low cut, waves coming in and a full lined beard'),
 ('brows-lineup','161',None,['beards'],'Crisp line-up and shaped beard, portrait'),
 # --- gallery ---
 ('g01','003',None,['waves','beards'],'360 waves, low taper and full beard with a sharp line-up'),
 ('g02','010',None,['fades'],'Low skin fade and clean line-up photographed outdoors'),
 ('g03','011',None,['textures'],'Twisted sponge top with a tight taper at the temple and nape'),
 ('g04','015',None,['textures','beards'],'Skin fade on straight hair with a textured top and blended beard'),
 ('g05','017',None,['waves'],'Waves flowing into a sharp temple line and clean neckline'),
 ('g06','020',None,['fades','beards'],'Mid fade with a lined beard, side profile'),
 ('g07','024',None,['textures'],'Low taper fade on straight dark hair, outdoors'),
 ('g08','026',None,['waves'],'Deep waves with a blended taper, side profile'),
 ('g09','028',None,['locs'],'Cornrow braids with a clean taper on the sides'),
 ('g10','032',None,['waves','beards'],'Waves and a full, sculpted beard, side profile'),
 ('g11','037',None,['locs','beards'],'Locs with a clean taper and lined beard'),
 ('g12','052',None,['beards'],'Sculpted full beard and taper, close side profile'),
 ('g13','055',None,['fades'],'Low fade with a crisp temple line, client looking down'),
 ('g14','065',None,['waves'],'360 waves with a low taper, rear three-quarter view'),
 ('g15','073',None,['textures'],'Tapered natural afro with defined edges'),
 ('g16','083',None,['textures'],'Sponge-curl top with a blended taper'),
 ('g17','091',None,['kids'],'Young client with a fresh taper and sponge curls'),
 ('g18','103',None,['locs'],'Two-strand twists with a clean shape-up'),
 ('g19','108',None,['locs','beards'],'Locs pulled back with a skin taper and full beard'),
 ('g20','109',None,['waves'],'Waves pattern and low fade, head tilted back'),
 ('g21','111',None,['textures'],'Low taper with curls on top'),
 ('g22','112',None,['textures','beards'],'Low taper on straight hair with a blended beard'),
 ('g23','114',None,['waves'],'Deep waves with a sharp temple and taper'),
 ('g24','115',None,['waves'],'Waves and a clean low fade, client looking down'),
 ('g25','117',None,['fades'],'High taper with a sharp line-up, side profile'),
 ('g26','118',None,['fades'],'Low fade and lined temple, side profile'),
 ('g27','133',None,['locs'],'Loc ponytail with a skin taper'),
 ('g28','135',None,['beards','fades'],'Low cut with a full beard and blended taper'),
 ('g29','141',None,['beards'],'Low cut and full beard with a sharp cheek line'),
 ('g30','151',None,['waves','beards'],'Waves and a full beard with a crisp line-up'),
 ('g31','152',None,['locs','beards'],'Straight-back cornrows with a lined beard'),
 ('g32','153',None,['waves'],'Tight 360 waves meeting a clean taper'),
 ('g33','154',None,['locs'],'Stitch-style cornrows with a clean taper'),
 ('g34','156',None,['fades'],'Low fade with a sharp temple, head tilted down'),
 ('g35','158',None,['fades'],'Mid taper with a clean line-up, side profile'),
 ('g36','166',None,['fades'],'Low cut with a razor-sharp line-up, close portrait'),
 ('g37','y00',None,['textures'],'Curly top with a low taper fade'),
 ('g38','y02',None,['textures'],'Classic short crop with a taper on straight hair'),
 ('g39','y03',None,['beards'],'Bald head with a full, shaped beard'),
 ('g40','y06',None,['waves'],'Waves and a low taper, side profile'),
 ('g41','y07',None,['textures'],'Textured crop with a low taper on straight hair'),
 ('g42','y08',None,['fades'],'Sponge-curl top with a high taper'),
 ('g43','y12',None,['textures'],'Textured top with a skin fade on straight hair'),
 ('g44','y14',None,['waves'],'Close-up of deep waves and a crisp line-up'),
 ('g45','y18',None,['textures'],'Loose curls on top with a mid taper'),
 ('g46','y19',None,['textures','beards'],'Burst fade with a lined beard, side profile'),
 ('g47','y22',None,['waves','fades'],'Waves with a sharp taper, three-quarter view'),
 ('g48','y23',None,['fades','experience'],'Smiling client with a fresh low cut and beard line-up'),
 ('g49','y27',None,['textures','beards'],'Taper fade with a textured top and lined beard'),
 ('g50','y30',None,['textures'],'Short textured cut on straight hair, outdoors'),
 ('g51','y33',None,['textures','beards'],'Curly top with a drop fade and lined beard'),
 ('g52','y34',None,['waves','beards'],'Waves and a sculpted beard with a sharp line-up'),
 ('g53','y35',None,['textures','beards'],'Curly top with a burst fade and lined beard'),
 ('g54','y37',None,['textures'],'Curly top with a low taper, outdoors'),
]

meta = []
for key, s, crop, tags, alt in PHOTOS:
    im = ImageOps.exif_transpose(Image.open(src(s))).convert('RGB')
    if crop:
        W, H = im.size
        im = im.crop((int(crop[0]*W), int(crop[1]*H), int(crop[2]*W), int(crop[3]*H)))
    w, h = im.size
    sizes = [1600, 960, 560] if key.startswith('hero') else [1200, 720]
    files = {}
    for tw in sizes:
        if tw > w and tw != sizes[-1]:
            continue
        t = im.copy()
        if tw < w:
            t = t.resize((tw, round(h * tw / w)), Image.LANCZOS)
        fn = f'{key}-{t.size[0]}.webp'
        t.save(f'{OUT}/{fn}', 'WEBP', quality=78, method=6)
        files[t.size[0]] = fn
    meta.append({'key': key, 'w': w, 'h': h, 'tags': tags, 'alt': alt,
                 'files': [{'w': k, 'src': f'/img/{v}'} for k, v in sorted(files.items())],
                 'source': 'yelp' if s.startswith('y') else 'instagram'})

os.makedirs('/home/claude/rucutz/src/data', exist_ok=True)
json.dump(meta, open('/home/claude/rucutz/src/data/photos.json', 'w'), indent=1)
print(len(meta), 'photos')
