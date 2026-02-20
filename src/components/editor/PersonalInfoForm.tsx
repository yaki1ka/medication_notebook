import { useNotebookStore } from '../../store/notebookStore';
import type { PersonalInfo } from '../../types/notebook';

const inputClass =
  'w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500';
const labelClass = 'block text-xs text-gray-600 mb-1';
const sectionClass = 'mb-4';
const sectionTitleClass = 'text-sm font-bold text-gray-700 border-b border-blue-200 pb-1 mb-2';

export function PersonalInfoForm() {
  const {
    personalInfo,
    notebookTitle,
    updatePersonalInfo,
    updateNotebookTitle,
    addEmergencyContact,
    removeEmergencyContact,
    updateEmergencyContact,
  } = useNotebookStore();

  const handleChange =
    (field: keyof PersonalInfo) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      updatePersonalInfo({ [field]: e.target.value } as Partial<PersonalInfo>);
    };

  return (
    <div className="p-3 space-y-1">
      {/* Notebook title */}
      <div className={sectionClass}>
        <div className={sectionTitleClass}>手帳タイトル</div>
        <div>
          <label className={labelClass}>手帳の名称</label>
          <input
            type="text"
            value={notebookTitle}
            onChange={(e) => updateNotebookTitle(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      {/* Basic info */}
      <div className={sectionClass}>
        <div className={sectionTitleClass}>基本情報</div>
        <div className="space-y-2">
          <div>
            <label className={labelClass}>お名前</label>
            <input type="text" value={personalInfo.name} onChange={handleChange('name')} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>ふりがな</label>
            <input type="text" value={personalInfo.nameKana} onChange={handleChange('nameKana')} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>生年月日</label>
            <input
              type="text"
              placeholder="例: 1980年1月1日"
              value={personalInfo.dateOfBirth}
              onChange={handleChange('dateOfBirth')}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>血液型</label>
            <select value={personalInfo.bloodType} onChange={handleChange('bloodType')} className={inputClass}>
              <option value="unknown">不明</option>
              <option value="A">A型</option>
              <option value="B">B型</option>
              <option value="AB">AB型</option>
              <option value="O">O型</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>住所</label>
            <input type="text" value={personalInfo.address} onChange={handleChange('address')} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>電話番号</label>
            <input type="tel" value={personalInfo.phone} onChange={handleChange('phone')} className={inputClass} />
          </div>
        </div>
      </div>

      {/* Medical info */}
      <div className={sectionClass}>
        <div className={sectionTitleClass}>医療情報</div>
        <div className="space-y-2">
          <div>
            <label className={labelClass}>持病・現在治療中の病気</label>
            <textarea
              value={personalInfo.preExistingConditions}
              onChange={handleChange('preExistingConditions')}
              rows={2}
              className={inputClass}
              placeholder="例: 高血圧、糖尿病"
            />
          </div>
        </div>
      </div>

      {/* Family doctor */}
      <div className={sectionClass}>
        <div className={sectionTitleClass}>かかりつけ医</div>
        <div className="space-y-2">
          <div>
            <label className={labelClass}>医師名</label>
            <input
              type="text"
              value={personalInfo.familyDoctor}
              onChange={handleChange('familyDoctor')}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>病院・クリニック名</label>
            <input
              type="text"
              value={personalInfo.familyDoctorHospital}
              onChange={handleChange('familyDoctorHospital')}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>電話番号</label>
            <input
              type="tel"
              value={personalInfo.familyDoctorPhone}
              onChange={handleChange('familyDoctorPhone')}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Family pharmacy */}
      <div className={sectionClass}>
        <div className={sectionTitleClass}>かかりつけ薬局</div>
        <div className="space-y-2">
          <div>
            <label className={labelClass}>薬局名</label>
            <input
              type="text"
              value={personalInfo.familyPharmacy}
              onChange={handleChange('familyPharmacy')}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>電話番号</label>
            <input
              type="tel"
              value={personalInfo.familyPharmacyPhone}
              onChange={handleChange('familyPharmacyPhone')}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Emergency contacts */}
      <div className={sectionClass}>
        <div className="flex items-center justify-between border-b border-blue-200 pb-1 mb-2">
          <span className="text-sm font-bold text-gray-700">緊急連絡先</span>
          <button
            onClick={addEmergencyContact}
            className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-0.5 rounded"
          >
            + 追加
          </button>
        </div>
        {personalInfo.emergencyContacts.map((contact, i) => (
          <div key={contact.id} className="border border-gray-200 rounded p-2 mb-2 bg-gray-50">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500">連絡先 {i + 1}</span>
              <button
                onClick={() => removeEmergencyContact(contact.id)}
                className="text-xs text-red-400 hover:text-red-600"
              >
                削除
              </button>
            </div>
            <div className="space-y-1">
              <div>
                <label className={labelClass}>お名前</label>
                <input
                  type="text"
                  value={contact.name}
                  onChange={(e) => updateEmergencyContact(contact.id, 'name', e.target.value)}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>続柄</label>
                <input
                  type="text"
                  value={contact.relationship}
                  onChange={(e) => updateEmergencyContact(contact.id, 'relationship', e.target.value)}
                  className={inputClass}
                  placeholder="例: 配偶者、子供"
                />
              </div>
              <div>
                <label className={labelClass}>電話番号</label>
                <input
                  type="tel"
                  value={contact.phone}
                  onChange={(e) => updateEmergencyContact(contact.id, 'phone', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        ))}
        {personalInfo.emergencyContacts.length === 0 && (
          <p className="text-xs text-gray-400 text-center py-2">
            「+ 追加」ボタンで緊急連絡先を登録できます
          </p>
        )}
      </div>

      {/* Other notes */}
      <div className={sectionClass}>
        <div className={sectionTitleClass}>その他メモ</div>
        <textarea
          value={personalInfo.otherNotes}
          onChange={handleChange('otherNotes')}
          rows={3}
          className={inputClass}
          placeholder="その他、医療従事者に伝えたいことなど"
        />
      </div>
    </div>
  );
}
