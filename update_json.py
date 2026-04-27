import json

def update_json(filepath, lang):
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)

    if lang == 'en':
        new_keys = {
            "heading": "Data Privacy Consent",
            "subheading": "Please review and consent to our data collection policies before uploading sensitive documents.",
            "sectionIdentity": "Identity & Legal Documents",
            "sectionHealth": "Health & Background Records",
            "sectionEducation": "Education & Professional Experience",
            "disclosure1": "Documents may be securely stored in offshore servers via Cloudinary.",
            "disclosure2": "Only authorized VCM staff will have access to your sensitive documents.",
            "disclosure3": "You retain the right to withdraw your consent and delete your data at any time via Settings.",
            "privacyLink": "Read our full Privacy Policy",
            "checkboxLabel": "I have read the Privacy Policy and I explicitly consent to the collection, storage, and processing of the sensitive documents listed above.",
            "continueBtn": "Continue to Upload",
            "declineBtn": "Go back",
            "consentBadge": "✓ Consent recorded"
        }
    else:
        new_keys = {
            "heading": "Өгөгдлийн нууцлалын зөвшөөрөл",
            "subheading": "Эмзэг мэдээлэл бүхий баримт бичгийг байршуулахын өмнө манай мэдээлэл цуглуулах бодлоготой танилцаж, зөвшөөрөл олгоно уу.",
            "sectionIdentity": "Иргэний үнэмлэх болон Хууль зүйн баримтууд",
            "sectionHealth": "Эрүүл мэнд болон Суурь мэдээлэл",
            "sectionEducation": "Боловсрол болон Мэргэжлийн туршлага",
            "disclosure1": "Баримт бичгүүдийг Cloudinary ашиглан гадаад дахь серверт аюулгүйгээр хадгалах болно.",
            "disclosure2": "Зөвхөн VCM-ийн эрх бүхий ажилтнууд таны эмзэг мэдээлэлд хандах эрхтэй.",
            "disclosure3": "Та хүссэн үедээ Тохиргоо цэсээр дамжуулан зөвшөөрлөө цуцалж, мэдээллээ устгуулах эрхтэй.",
            "privacyLink": "Нууцлалын бодлогыг бүтнээр нь унших",
            "checkboxLabel": "Би Нууцлалын бодлогыг уншиж танилцсан бөгөөд дээр дурдсан эмзэг мэдээллийг цуглуулж, хадгалж, боловсруулахыг бүрэн зөвшөөрч байна.",
            "continueBtn": "Үргэлжлүүлэх",
            "declineBtn": "Буцах",
            "consentBadge": "✓ Зөвшөөрөл баталгаажсан"
        }

    if "SubmitDocuments" not in data:
        data["SubmitDocuments"] = {}
        
    for k, v in new_keys.items():
        data["SubmitDocuments"][k] = v

    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        # add a newline at the end of the file
        f.write('\n')

update_json('messages/en.json', 'en')
update_json('messages/mn.json', 'mn')
