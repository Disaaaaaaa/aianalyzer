export interface QuestionnaireData {
  name: string;
  age: string;
  educationLevel: string;
  profession: string;
  interests: string;
  favoriteSubjects: string;
  futureGoal: string;
  currentSkills: string;
  workStyle: string;
  aiKnowledgeLevel: string;
  desiredDirections: string;
}

export interface AiResponseData {
  future_profession: string;
  ai_risk_percentage: number;
  risk_level: string;
  short_summary: string;
  profession_future: string;
  required_skills: {
    technical: string[];
    soft: string[];
    professional: string[];
  };
  future_day_story: string;
  development_plan: {
    one_month: string[];
    six_months: string[];
    one_year: string[];
  };
  future_id_card: {
    name: string;
    future_profession: string;
    main_skill: string;
    status: string;
    id_code: string;
  };
  advice: string;
}
