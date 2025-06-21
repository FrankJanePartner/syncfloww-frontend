
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeft } from "lucide-react";

interface BrandSetupProps {
  onBack: () => void;
  onComplete: () => void;
}

const BrandSetup = ({ onBack, onComplete }: BrandSetupProps) => {
  const [brandName, setBrandName] = useState("");
  const [industry, setIndustry] = useState("");
  const [website, setWebsite] = useState("");

  return (
    <div className="max-w-2xl mx-auto p-8">
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-6 p-0 h-auto hover:bg-transparent"
      >
        <ChevronLeft className="h-5 w-5 mr-1" />
      </Button>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Hi, Samantha!</h2>
        <p className="text-gray-600">Let's Get Started!</p>
      </div>

      <div className="space-y-6">
        <div>
          <Input
            placeholder="Brand Name"
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            className="w-full px-4 py-4 rounded-full border-2 border-gray-200 focus:border-blue-500 text-center"
          />
        </div>
        
        <div>
          <Input
            placeholder="Brand's Industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full px-4 py-4 rounded-full border-2 border-gray-200 focus:border-blue-500 text-center"
          />
        </div>
        
        <div>
          <Input
            placeholder="Website URL"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="w-full px-4 py-4 rounded-full border-2 border-gray-200 focus:border-blue-500 text-center"
          />
        </div>

        <div className="flex items-center space-x-2 py-4">
          <span className="text-gray-700">Permission to manage brand?</span>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <span className="text-xs">🔗</span>
          </Button>
        </div>

        <Button
          onClick={onComplete}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-full font-semibold mt-8"
          disabled={!brandName || !industry}
        >
          Create Brand
        </Button>
      </div>
    </div>
  );
};

export default BrandSetup;
