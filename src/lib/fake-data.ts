export interface HealthInsights {
  heartRate: number;
  bloodPressure: {
    systolic: number;
    diastolic: number;
  };
  oxygenSaturation: number;
  stressLevel: number;
  cognitiveScore: number;
}

export function generateFakeInsights(estimatedAge: number): HealthInsights {
  // Base values for a healthy adult
  const baseInsights: HealthInsights = {
    heartRate: 72,
    bloodPressure: {
      systolic: 120,
      diastolic: 80
    },
    oxygenSaturation: 98,
    stressLevel: 35,
    cognitiveScore: 85
  };

  // Age-based variations
  const ageVariation = Math.max(0, Math.min(100, estimatedAge));
  const variationFactor = (ageVariation - 40) / 20; // Normalize around age 40

  // Generate random variations between -3 and 4
  const randomVariation = () => Math.floor(Math.random() * 8) - 3;

  return {
    heartRate: Math.max(60, Math.min(100, baseInsights.heartRate + randomVariation() + variationFactor)),
    bloodPressure: {
      systolic: Math.max(90, Math.min(140, baseInsights.bloodPressure.systolic + randomVariation() + variationFactor)),
      diastolic: Math.max(60, Math.min(90, baseInsights.bloodPressure.diastolic + randomVariation() + variationFactor))
    },
    oxygenSaturation: Math.max(95, Math.min(100, baseInsights.oxygenSaturation + randomVariation())),
    stressLevel: Math.max(0, Math.min(100, baseInsights.stressLevel + randomVariation() - variationFactor)),
    cognitiveScore: Math.max(0, Math.min(100, baseInsights.cognitiveScore + randomVariation() - variationFactor))
  };
}

// Function to estimate age based on facial features (simplified for demo)
export function estimateAgeFromImage(imageData: string): number {
  // In a real implementation, this would use ML to estimate age
  // For demo purposes, we'll return a random age between 20-80
  return Math.floor(Math.random() * 60) + 20;
} 