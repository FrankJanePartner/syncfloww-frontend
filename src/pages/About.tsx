
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            About{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SyncFlow
            </span>
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Empowering businesses to revolutionize their social media presence through AI-powered automation and intelligent insights.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6">
                We believe that every business deserves to have a powerful social media presence. Our mission is to democratize advanced marketing tools by making AI-powered social media management accessible to businesses of all sizes.
              </p>
              <p className="text-lg text-gray-600">
                Through innovative technology and user-friendly design, we help brands connect with their audiences more effectively, save time on repetitive tasks, and achieve measurable growth in their digital marketing efforts.
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8">
              <div className="bg-white rounded-2xl p-6">
                <div className="text-center space-y-4">
                  <div className="text-4xl">🚀</div>
                  <h3 className="text-xl font-bold text-gray-900">Innovation First</h3>
                  <p className="text-gray-600">
                    Leveraging cutting-edge AI technology to transform how businesses approach social media marketing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600">The principles that guide everything we do</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Simplicity</h3>
              <p className="text-gray-600">
                Complex technology made simple. We believe powerful tools should be easy to use and understand.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Partnership</h3>
              <p className="text-gray-600">
                We're not just a service provider - we're your partner in achieving social media success.
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Results</h3>
              <p className="text-gray-600">
                Every feature we build is designed to deliver measurable results for your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 mb-6">
              Founded in 2024, SyncFlow emerged from a simple observation: businesses were spending countless hours on social media management tasks that could be automated, while struggling to extract meaningful insights from their social media data.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Our founding team, with backgrounds in AI research, digital marketing, and user experience design, came together with a shared vision of creating a platform that would not just automate social media tasks, but intelligently optimize them.
            </p>
            <p className="text-lg text-gray-600">
              Today, we're proud to serve businesses worldwide, helping them achieve better results with less effort through our AI-powered social media management platform.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Social Media?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of businesses already using SyncFlow to grow their social media presence.
          </p>
          <Link to="/">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-full font-semibold shadow-lg hover:shadow-xl transition-all">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
