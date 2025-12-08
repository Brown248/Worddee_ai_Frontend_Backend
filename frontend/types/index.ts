export interface WordData {
    word: string;
    level: string;
    meaning: string;
    example: string;
    image_url: string;
}

export interface AIResult {
    score: number;
    level: string;
    suggestion: string;
    corrected_sentence: string;
}

export interface ChartDataPoint {
    name: string;
    score: number;
}

export interface DashboardStats {
    stats: {
        day_streak: number;
        hours_learned: number;
        minutes_learned: number;
        missions_completed: boolean;
    };
    chart_data: ChartDataPoint[];
}