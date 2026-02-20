import { useUiStore } from '../../store/uiStore';
import { PersonalInfoForm } from './PersonalInfoForm';
import { PageList } from './PageList';

export function EditorTabs() {
  const { activeTab, setActiveTab } = useUiStore();

  return (
    <div className="flex flex-col h-full">
      {/* Tab header */}
      <div className="flex border-b border-gray-200 bg-white shrink-0">
        <button
          onClick={() => setActiveTab('personalInfo')}
          className={`flex-1 py-2 text-sm font-medium transition-colors ${
            activeTab === 'personalInfo'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          個人情報
        </button>
        <button
          onClick={() => setActiveTab('pages')}
          className={`flex-1 py-2 text-sm font-medium transition-colors ${
            activeTab === 'pages'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          ページ構成
        </button>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'personalInfo' ? <PersonalInfoForm /> : <PageList />}
      </div>
    </div>
  );
}
