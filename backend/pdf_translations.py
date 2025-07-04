"""
PDF Translation System for RegulaEase
Supports multilingual PDF generation in English, Afrikaans, Zulu, and Xhosa
"""

PDF_TRANSLATIONS = {
    'en': {
        'report_title': 'RegulaEase Business Progress Report',
        'business_type': 'Business Type',
        'generated': 'Generated',
        'executive_summary': 'Executive Summary',
        'progress_overview': 'Progress Overview',
        'compliance_status': 'Compliance Status',
        'skills_development': 'Skills Development',
        'knowledge_assessment': 'Knowledge Assessment',
        'recommended_next_steps': 'Recommended Next Steps',
        'overall_progress': 'Overall Progress',
        'business_compliance': 'Business Compliance',
        'complete': 'complete',
        'resources_bookmarked': 'resources bookmarked',
        'correct': 'correct',
        'summary_text': 'Your business is making excellent progress! Here\'s a snapshot of your current status:',
        'detailed_insights': 'This report provides detailed insights into your business development journey and recommendations for continued growth.',
        'progress_charts_failed': 'Progress charts could not be generated. All data is included in the detailed sections below.',
        'chart_titles': {
            'progress_by_category': 'Progress by Category',
            'compliance_tasks': 'Compliance Tasks',
            'skills_by_category': 'Skills by Category',
            'priority_distribution': 'Priority Distribution'
        },
        'chart_labels': {
            'compliance': 'Compliance',
            'skills': 'Skills',
            'knowledge': 'Knowledge',
            'completed': 'Completed',
            'remaining': 'Remaining',
            'bookmarked_resources': 'Bookmarked Resources'
        },
        'compliance_analysis': {
            'title': 'Compliance Analysis',
            'total_tasks': 'Total Tasks',
            'completed_tasks': 'Completed Tasks',
            'progress_percentage': 'Progress Percentage',
            'priority_breakdown': 'Priority Breakdown',
            'high_priority': 'High Priority',
            'medium_priority': 'Medium Priority',
            'low_priority': 'Low Priority',
            'excellent_progress': 'Excellent progress on compliance requirements!',
            'good_progress': 'Good progress, keep up the momentum!',
            'needs_attention': 'Some areas need attention to ensure full compliance.'
        },
        'skills_analysis': {
            'title': 'Skills Analysis',
            'total_resources': 'Total Resources',
            'bookmarked': 'Bookmarked',
            'category_distribution': 'Category Distribution',
            'well_rounded': 'You\'re developing a well-rounded skill set!',
            'focus_areas': 'Consider focusing on additional areas for comprehensive growth.',
            'bookmark_more': 'Bookmark more resources to accelerate your learning.'
        },
        'quiz_analysis': {
            'title': 'Quiz Analysis',
            'score': 'Score',
            'total_questions': 'Total Questions',
            'percentage': 'Percentage',
            'category': 'Category',
            'completed_at': 'Completed at',
            'excellent_knowledge': 'Excellent knowledge demonstration!',
            'good_understanding': 'Good understanding of the subject matter.',
            'needs_improvement': 'Consider reviewing the material for better understanding.'
        },
        'action_items': {
            'title': 'Action Items',
            'continue_compliance': 'Continue working on compliance tasks to reach 100% completion.',
            'explore_skills': 'Explore additional skills development resources.',
            'maintain_momentum': 'Maintain your current momentum and consistency.',
            'review_progress': 'Review your progress regularly and adjust strategies as needed.'
        }
    },
    'af': {
        'report_title': 'RegulaEase Besigheidsvordering Verslag',
        'business_type': 'Besigheid Tipe',
        'generated': 'Gegenereer',
        'executive_summary': 'Uitvoerende Opsomming',
        'progress_overview': 'Vordering Oorsig',
        'compliance_status': 'Nakoming Status',
        'skills_development': 'Vaardigheidsontwikkeling',
        'knowledge_assessment': 'Kennis Assessering',
        'recommended_next_steps': 'Aanbevole Volgende Stappe',
        'overall_progress': 'Algehele Vordering',
        'business_compliance': 'Besigheidsnakoming',
        'complete': 'voltooi',
        'resources_bookmarked': 'hulpbronne geboekmerk',
        'correct': 'korrek',
        'summary_text': 'Jou besigheid maak uitstekende vordering! Hier is \'n oorsig van jou huidige status:',
        'detailed_insights': 'Hierdie verslag bied gedetailleerde insigte in jou besigheidsontwikkelingreis en aanbevelings vir voortgesette groei.',
        'progress_charts_failed': 'Vorderingsgrafieke kon nie gegenereer word nie. Alle data word in die gedetailleerde afdelings hieronder ingesluit.',
        'chart_titles': {
            'progress_by_category': 'Vordering per Kategorie',
            'compliance_tasks': 'Nakoming Take',
            'skills_by_category': 'Vaardighede per Kategorie',
            'priority_distribution': 'Prioriteit Verspreiding'
        },
        'chart_labels': {
            'compliance': 'Nakoming',
            'skills': 'Vaardighede',
            'knowledge': 'Kennis',
            'completed': 'Voltooi',
            'remaining': 'Oorblywend',
            'bookmarked_resources': 'Geboekmerkde Hulpbronne'
        },
        'compliance_analysis': {
            'title': 'Nakoming Analise',
            'total_tasks': 'Totale Take',
            'completed_tasks': 'Voltooide Take',
            'progress_percentage': 'Vordering Persentasie',
            'priority_breakdown': 'Prioriteit Verdeling',
            'high_priority': 'Hoë Prioriteit',
            'medium_priority': 'Medium Prioriteit',
            'low_priority': 'Lae Prioriteit',
            'excellent_progress': 'Uitstekende vordering op nakoming vereistes!',
            'good_progress': 'Goeie vordering, hou die momentum aan!',
            'needs_attention': 'Sommige areas benodig aandag om volle nakoming te verseker.'
        },
        'skills_analysis': {
            'title': 'Vaardighede Analise',
            'total_resources': 'Totale Hulpbronne',
            'bookmarked': 'Geboekmerk',
            'category_distribution': 'Kategorie Verspreiding',
            'well_rounded': 'Jy ontwikkel \'n goed-geronde vaardigheidstel!',
            'focus_areas': 'Oorweeg om te fokus op addisionele areas vir omvattende groei.',
            'bookmark_more': 'Boekmerk meer hulpbronne om jou leer te versnel.'
        },
        'quiz_analysis': {
            'title': 'Quiz Analise',
            'score': 'Telling',
            'total_questions': 'Totale Vrae',
            'percentage': 'Persentasie',
            'category': 'Kategorie',
            'completed_at': 'Voltooi om',
            'excellent_knowledge': 'Uitstekende kennis demonstrasie!',
            'good_understanding': 'Goeie begrip van die onderwerp.',
            'needs_improvement': 'Oorweeg om die materiaal te hersien vir beter begrip.'
        },
        'action_items': {
            'title': 'Aksie Items',
            'continue_compliance': 'Gaan voort met nakoming take om 100% voltooiing te bereik.',
            'explore_skills': 'Verken addisionele vaardigheidsontwikkeling hulpbronne.',
            'maintain_momentum': 'Behou jou huidige momentum en konsekwentheid.',
            'review_progress': 'Hersien jou vordering gereeld en pas strategieë aan soos nodig.'
        }
    },
    'zu': {
        'report_title': 'RegulaEase Umbiko Wentuthuko Yebhizinisi',
        'business_type': 'Uhlobo Lwebhizinisi',
        'generated': 'Kukhiqiziwe',
        'executive_summary': 'Isifinyezo Sesigungu',
        'progress_overview': 'Ukubukwa Kwentuthuko',
        'compliance_status': 'Isimo Sokulalela',
        'skills_development': 'Ukuthuthukiswa Kwamakhono',
        'knowledge_assessment': 'Ukuhlolwa Kolwazi',
        'recommended_next_steps': 'Izinyathelo Ezihlongozwayo Ezilandelayo',
        'overall_progress': 'Intuthuko Jikelele',
        'business_compliance': 'Ukulalela Kwebhizinisi',
        'complete': 'kuqedisiwe',
        'resources_bookmarked': 'izinsiza zibekwe kumaki',
        'correct': 'kulungile',
        'summary_text': 'Ibhizinisi yakho yenza intuthuko enhle kakhulu! Nasi isithombe sesimo sakho samanje:',
        'detailed_insights': 'Lo mbiko unikeza ukuqonda okujulile ngohambo lwakho lokuthuthukiswa kwebhizinisi nezincomo zokuqhubeka nokukhula.',
        'progress_charts_failed': 'Amashadi entuthuko awukwazanga ukwenziwa. Yonke idatha ifakwe ezingxenyeni eziyingcazelo ngezansi.',
        'chart_titles': {
            'progress_by_category': 'Intuthuko Ngokwesigaba',
            'compliance_tasks': 'Imisebenzi Yokulalela',
            'skills_by_category': 'Amakhono Ngokwesigaba',
            'priority_distribution': 'Ukusabalalisa Kwezinto Ezibalulekile'
        },
        'chart_labels': {
            'compliance': 'Ukulalela',
            'skills': 'Amakhono',
            'knowledge': 'Ulwazi',
            'completed': 'Kuqedisiwe',
            'remaining': 'Okusasele',
            'bookmarked_resources': 'Izinsiza Ezibekwe Kumaki'
        },
        'compliance_analysis': {
            'title': 'Ukuhlaziya Kokulalela',
            'total_tasks': 'Imisebenzi Yonke',
            'completed_tasks': 'Imisebenzi Eqedisiwe',
            'progress_percentage': 'Iphesenti Lentuthuko',
            'priority_breakdown': 'Ukwehlukaniswa Kwezinto Ezibalulekile',
            'high_priority': 'Okudluliswa Phambili',
            'medium_priority': 'Okudluliswa Phakathi',
            'low_priority': 'Okudluliswa Phansi',
            'excellent_progress': 'Intuthuko enhle kakhulu ezidingweni zokulalela!',
            'good_progress': 'Intuthuko enhle, qhubeka nomshikashika!',
            'needs_attention': 'Ezinye izindawo zidinga ukunakwa ukuze kuqinisekiswe ukulalela okugcwele.'
        },
        'skills_analysis': {
            'title': 'Ukuhlaziya Kwamakhono',
            'total_resources': 'Zonke Izinsiza',
            'bookmarked': 'Kubeke Kumaki',
            'category_distribution': 'Ukusabalalisa Kwesigaba',
            'well_rounded': 'Uthuthukisa isethi yamakhono ebalancile!',
            'focus_areas': 'Cabanga ukugxila ezindaweni ezengeziwe zokukhula okuzothinta zonke izinto.',
            'bookmark_more': 'Beka ezinye izinsiza kumaki ukusheshisa ukufunda kwakho.'
        },
        'quiz_analysis': {
            'title': 'Ukuhlaziya Kwemibuzo',
            'score': 'Amaphuzu',
            'total_questions': 'Imibuzo Yonke',
            'percentage': 'Iphesenti',
            'category': 'Isigaba',
            'completed_at': 'Kuqedisiwe ngo',
            'excellent_knowledge': 'Ukubonakaliswa kolwazi okuhle kakhulu!',
            'good_understanding': 'Ukuqonda okuhle kwendaba.',
            'needs_improvement': 'Cabanga ukubuyekeza izinto zokufunda ukuze uqonde kangcono.'
        },
        'action_items': {
            'title': 'Izinto Okufanele Zenziwe',
            'continue_compliance': 'Qhubeka nokwenza imisebenzi yokulalela ukuze ufinyelele ekuqediseni okungama-100%.',
            'explore_skills': 'Hlola izinsiza ezengeziwe zokuthuthukiswa kwamakhono.',
            'maintain_momentum': 'Gcina umshikashika wakho wamanje nokungaguquki.',
            'review_progress': 'Buyekeza intuthuko yakho njalo futhi ulungise amasu njengoba kudingeka.'
        }
    },
    'xh': {
        'report_title': 'RegulaEase Ingxelo Yenkqubela Yeshishini',
        'business_type': 'Uhlobo Lweshishini',
        'generated': 'Kuveliswe',
        'executive_summary': 'Isishwankathelo Esingundoqo',
        'progress_overview': 'Imboniselo Yenkqubela',
        'compliance_status': 'Imeko Yokuthobela',
        'skills_development': 'Uphuhliso Lwezakhono',
        'knowledge_assessment': 'Uvavanyo Lolwazi',
        'recommended_next_steps': 'Amanyathelo Acetyiswayo Alandelayo',
        'overall_progress': 'Inkqubela Ngokubanzi',
        'business_compliance': 'Ukuthobela Kweshishini',
        'complete': 'kugqityiwe',
        'resources_bookmarked': 'izixhobo zibukishwe',
        'correct': 'kulungile',
        'summary_text': 'Ishishini lakho lenza inkqubela emangalisayo! Nantsi imifanekiso yemeko yakho yangoku:',
        'detailed_insights': 'Le ngxelo inika ukuqonda okujulileyo kuhambo lwakho lokuphuhliswa kweshishini neengcebiso zokuqhubeka nokukhula.',
        'progress_charts_failed': 'Iitshathi zenkqubela azikwazanga ukwenziwa. Yonke idatha ifakwe kumacandelo aneenkcukacha apha ngezantsi.',
        'chart_titles': {
            'progress_by_category': 'Inkqubela Ngokwecandelo',
            'compliance_tasks': 'Imisebenzi Yokuthobela',
            'skills_by_category': 'Izakhono Ngokwecandelo',
            'priority_distribution': 'Ukusasazwa Kwezinto Ezibalulekileyo'
        },
        'chart_labels': {
            'compliance': 'Ukuthobela',
            'skills': 'Izakhono',
            'knowledge': 'Ulwazi',
            'completed': 'Kugqityiwe',
            'remaining': 'Okuseleyo',
            'bookmarked_resources': 'Izixhobo Ezibukishiweyo'
        },
        'compliance_analysis': {
            'title': 'Ucalulo Lokuthobela',
            'total_tasks': 'Yonke Imisebenzi',
            'completed_tasks': 'Imisebenzi Egqityiweyo',
            'progress_percentage': 'Ipesenti Yenkqubela',
            'priority_breakdown': 'Ukuhlula Kwezinto Ezibalulekileyo',
            'high_priority': 'Eyona Nto Ibalulekileyo',
            'medium_priority': 'Ebaluleke Embindini',
            'low_priority': 'Engabalulekanga Kangako',
            'excellent_progress': 'Inkqubela emangalisayo kwiimfuno zokuthobela!',
            'good_progress': 'Inkqubela entle, qhubeka namphamb!',
            'needs_attention': 'Ezinye iindawo zidinga ukuhonjwa ukuze kuqinisekiswe ukuthobela okupheleleyo.'
        },
        'skills_analysis': {
            'title': 'Ucalulo Lwezakhono',
            'total_resources': 'Zonke Izixhobo',
            'bookmarked': 'Kubukishiwe',
            'category_distribution': 'Ukusasazwa Kwecandelo',
            'well_rounded': 'Uphuhlisa izakhono ezilinganayo!',
            'focus_areas': 'Qwalasela ukugxila kweenye iindawo zokukhula okubanzi.',
            'bookmark_more': 'Bukisha ezinye izixhobo ukukhawulezisa ukufunda kwakho.'
        },
        'quiz_analysis': {
            'title': 'Ucalulo Lwemibuzo',
            'score': 'Amanqaku',
            'total_questions': 'Yonke Imibuzo',
            'percentage': 'Ipesenti',
            'category': 'Icandelo',
            'completed_at': 'Kugqityiwe ngo',
            'excellent_knowledge': 'Ukubonakaliswa kolwazi okumangalisayo!',
            'good_understanding': 'Ukuqonda okuhle kweendaba.',
            'needs_improvement': 'Qwalasela ukujonga kwakhona izinto zokufunda ukuze uqonde ngcono.'
        },
        'action_items': {
            'title': 'Izinto Ezimele Zenziwe',
            'continue_compliance': 'Qhubeka nokwenza imisebenzi yokuthobela ukuze ufikelele ekugqibeni okungama-100%.',
            'explore_skills': 'Khangela ezinye izixhobo zophuhliso lwezakhono.',
            'maintain_momentum': 'Gcina umdla wakho wangoku nokungaguquki.',
            'review_progress': 'Jonga inkqubela yakho rhoqo kwaye ulunge amacebo njengoko kufuneka.'
        }
    }
}

def get_translation(language, key, default=None):
    """
    Get a translation for a specific key in the specified language
    
    Args:
        language (str): Language code (en, af, zu, xh)
        key (str): Translation key (can be nested with dots, e.g., 'chart_titles.progress_by_category')
        default (str): Default value if translation not found
    
    Returns:
        str: Translated text or default value
    """
    if language not in PDF_TRANSLATIONS:
        language = 'en'  # Fallback to English
    
    translations = PDF_TRANSLATIONS[language]
    
    # Handle nested keys
    if '.' in key:
        keys = key.split('.')
        value = translations
        for k in keys:
            if isinstance(value, dict) and k in value:
                value = value[k]
            else:
                return default or key
        return value
    
    return translations.get(key, default or key)

def get_language_name(language_code):
    """Get the full name of a language from its code"""
    language_names = {
        'en': 'English',
        'af': 'Afrikaans',
        'zu': 'isiZulu',
        'xh': 'isiXhosa'
    }
    return language_names.get(language_code, 'English')

def get_supported_languages():
    """Get list of supported language codes"""
    return list(PDF_TRANSLATIONS.keys()) 