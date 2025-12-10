export interface FortuneData {
  name: string;
  birthDate: string;
}

export interface DivinationResult {
  linggen: string; // Spirit Root (e.g., Heavenly Fire)
  realm: string;   // Potential Realm (e.g., Golden Core)
  element: string; // Five Elements affinity
  poem: string;    // A short poem describing fate
  analysis: string; // Detailed analysis
  luckyArtifact: string; // A lucky item
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  RESULT = 'RESULT',
}
