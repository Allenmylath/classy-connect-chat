import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Briefcase, MapPin, Users } from "lucide-react";

const JobDescription = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            WhiteKitty Interview Bot
          </h1>
          <p className="text-muted-foreground">Review the position details before proceeding</p>
        </div>

        {/* Job Overview Card */}
        <Card className="mb-6 shadow-card">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-3xl mb-2">Production Technician</CardTitle>
                <CardDescription className="text-lg">EU Volt - Battery Production</CardDescription>
              </div>
              <Briefcase className="w-8 h-8 text-primary" />
            </div>
            <div className="flex gap-4 mt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Zurich</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>3 Positions Available</span>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Job Description */}
        <Card className="mb-6 shadow-card">
          <CardHeader>
            <CardTitle>About the Role</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground">
              We are seeking 3 dedicated Production Technicians to join our team in Zurich. 
              This role is crucial for ensuring high-quality standards in our growing Battery production.
            </p>
          </CardContent>
        </Card>

        {/* Key Responsibilities */}
        <Card className="mb-6 shadow-card">
          <CardHeader>
            <CardTitle>Key Responsibilities</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Feed, operate, monitor and maintain production lines as part of the production team</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Support and oversee the production line for battery, ensuring smooth operation and adherence to quality benchmarks</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Maintain accurate documentation of production processes and ensure compliance with quality standards</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Contribute to troubleshooting and problem-solving efforts to improve production efficiency and quality</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Train the operators all process of battery assembling</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Collaborate with R&D on developing new testing methods and product improvements</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Trouble shoot the errors in HMI</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Qualifications */}
        <Card className="mb-6 shadow-card">
          <CardHeader>
            <CardTitle>Qualifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Required:</h3>
              <ul className="space-y-2 text-foreground">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Relevant educational background - different educational backgrounds will be applicable and relevant for the position</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Lab technicians and HMI & PLC-experienced programmers with at least two years relevant experience will be prioritized</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>Fluency in English, both written and oral, and Danish</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-foreground mb-2">Preferred:</h3>
              <ul className="space-y-2 text-foreground">
                <li className="flex gap-2">
                  <span className="text-primary-glow">•</span>
                  <span>Experience from electroplating, other metal coating or other chemical production industry</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary-glow">•</span>
                  <span>Experience in handling of dangerous goods and bulk chemicals (use of PPE, emergency procedures, spill handling, safe storage practices, etc.)</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary-glow">•</span>
                  <span>Experience operating and maintaining equipment used for the handling of bulk chemicals and plant maintenance</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary-glow">•</span>
                  <span>Experience in participation during risk assessments</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary-glow">•</span>
                  <span>Experience in data collection /collaboration with R&D</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Personal Attributes */}
        <Card className="mb-6 shadow-card">
          <CardHeader>
            <CardTitle>Personal Attributes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>You are a highly positive and committed team player</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>You identify with our values: Courage, Integrity, Collaboration, and Innovation</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>You are detail-oriented with strong organizational skills</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>You are a proactive problem-solver with a drive for continuous improvement</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Why Join Us */}
        <Card className="mb-6 shadow-card">
          <CardHeader>
            <CardTitle>Why Join Us?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground">
              Our commitment to excellence and massive growth drives us to seek talented individuals who share our passion for enabling the green transition, through Courage, Integrity, Collaboration, and Innovation.
            </p>
            <p className="text-foreground">
              EU Volt is empowered by our diverse workforce. We ensure a good working environment where equal opportunity, diversity and inclusion are considered vital to our success. We believe diversity creates value, attracts talent, and makes life more interesting. We therefore encourage and welcome applications from qualified candidates from diverse backgrounds relate to race, religion, nationality, sexual orientation, gender, ethnicity, disability, age, and more.
            </p>
          </CardContent>
        </Card>

        {/* About EU Volt */}
        <Card className="mb-8 shadow-card">
          <CardHeader>
            <CardTitle>About EU Volt</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-foreground">
              EU Volt is at the forefront of sustainable energy storage, specialising in the production of advanced batteries for vehicles. With a dedicated team of 1,000 highly skilled professionals, we are committed to driving innovation and achieving excellence in our field.
            </p>
            <p className="text-foreground">
              Our state-of-the-art technology ensures that each battery cell boasts an impressive lifespan of 25 years, providing reliable and enduring energy storage solutions. At EU Volt, we place a strong emphasis on environmental sustainability, utilising materials and processes that facilitate the easy and safe recycling of our batteries.
            </p>
            <p className="text-foreground">
              This approach not only minimises waste but also supports a circular economy. Our batteries are engineered to store substantial amounts of energy, making them ideal for a wide range of vehicle applications. By choosing EU Volt, you are investing in a future powered by clean and efficient energy solutions.
            </p>
            <p className="text-foreground font-semibold">
              Join us in our mission to transform the energy storage industry and lead the transition to a greener world. Together, we can power the future with sustainable and innovative technology.
            </p>
          </CardContent>
        </Card>

        {/* CTA Button */}
        <div className="flex justify-center mb-8">
          <Button 
            variant="connect"
            size="lg"
            onClick={() => navigate('/interview')}
            className="text-lg px-12 py-6 h-auto"
          >
            I Qualify For This Job
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
