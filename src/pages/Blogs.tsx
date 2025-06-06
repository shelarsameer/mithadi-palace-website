
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight, Clock } from 'lucide-react';

const Blogs = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Art of Making Perfect Kaju Katli",
      excerpt: "Discover the secrets behind crafting the perfect cashew-based sweet that melts in your mouth. Learn about traditional techniques and modern innovations.",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=600&q=80",
      author: "Chef Rajesh Kumar",
      date: "December 15, 2024",
      readTime: "5 min read",
      category: "Recipes"
    },
    {
      id: 2,
      title: "Festival Sweets: A Cultural Journey",
      excerpt: "Explore how different Indian festivals are celebrated with unique sweets and the cultural significance behind each delicacy.",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=600&q=80",
      author: "Priya Sharma",
      date: "December 10, 2024",
      readTime: "8 min read",
      category: "Culture"
    },
    {
      id: 3,
      title: "Health Benefits of Traditional Ingredients",
      excerpt: "Learn about the nutritional value and health benefits of ingredients like jaggery, nuts, and milk in traditional Indian sweets.",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=600&q=80",
      author: "Dr. Meera Patel",
      date: "December 5, 2024",
      readTime: "6 min read",
      category: "Health"
    },
    {
      id: 4,
      title: "Behind the Scenes: A Day at Mithadi Palace",
      excerpt: "Take a virtual tour of our kitchen and see how our master chefs create magic with traditional recipes and modern techniques.",
      image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?auto=format&fit=crop&w=600&q=80",
      author: "Amit Singh",
      date: "November 28, 2024",
      readTime: "4 min read",
      category: "Behind the Scenes"
    },
    {
      id: 5,
      title: "The Evolution of Indian Sweets",
      excerpt: "From ancient times to modern innovations, discover how Indian sweets have evolved while maintaining their traditional essence.",
      image: "https://images.unsplash.com/photo-1605522731013-09db28bac984?auto=format&fit=crop&w=600&q=80",
      author: "Historian Suresh Gupta",
      date: "November 20, 2024",
      readTime: "7 min read",
      category: "History"
    },
    {
      id: 6,
      title: "Sweet Pairing Guide: Tea & Sweets",
      excerpt: "Learn which sweets pair perfectly with different types of tea and beverages for the ultimate taste experience.",
      image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?auto=format&fit=crop&w=600&q=80",
      author: "Tea Master Vikram",
      date: "November 15, 2024",
      readTime: "5 min read",
      category: "Pairing"
    }
  ];

  const categories = ["All", "Recipes", "Culture", "Health", "Behind the Scenes", "History", "Pairing"];

  return (
    <div className="container mx-auto px-4 py-24">
      {/* Header */}
      <div className="text-center mb-16">
        <Badge className="bg-royal-gold/10 text-royal-gold hover:bg-royal-gold/20 mb-4">
          Sweet Stories
        </Badge>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-royal-brown mb-6">
          Our Blog
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover the rich traditions, stories, and secrets behind India's most beloved sweets through our collection of articles and insights.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => (
          <Button
            key={category}
            variant={category === "All" ? "default" : "outline"}
            className={category === "All" ? "bg-royal-gold hover:bg-royal-darkGold" : "border-royal-gold text-royal-gold hover:bg-royal-gold hover:text-white"}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Featured Post */}
      <div className="mb-16">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-royal-brown to-royal-darkGold p-1">
          <div className="bg-white rounded-3xl p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <Badge className="bg-royal-gold/20 text-royal-gold mb-4">
                  Featured Article
                </Badge>
                <h2 className="font-serif text-3xl lg:text-4xl font-bold text-royal-brown mb-4">
                  {blogPosts[0].title}
                </h2>
                <p className="text-gray-600 text-lg mb-6">
                  {blogPosts[0].excerpt}
                </p>
                <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {blogPosts[0].author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {blogPosts[0].date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {blogPosts[0].readTime}
                  </div>
                </div>
                <Button className="bg-royal-gold hover:bg-royal-darkGold">
                  Read Full Article
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              <div className="relative">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-80 object-cover rounded-2xl"
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-royal-gold text-white">
                    {blogPosts[0].category}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.slice(1).map((post) => (
          <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group">
            <div className="relative">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4">
                <Badge className="bg-royal-gold/90 text-white">
                  {post.category}
                </Badge>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="font-serif text-xl font-bold text-royal-brown mb-3 group-hover:text-royal-gold transition-colors">
                {post.title}
              </h3>
              
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {post.author}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </div>
              </div>
              
              <Button variant="outline" className="w-full border-royal-gold text-royal-gold hover:bg-royal-gold hover:text-white">
                Read More
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </article>
        ))}
      </div>

      {/* Newsletter Signup */}
      <div className="mt-20 bg-gradient-to-r from-royal-cream to-royal-cream/50 rounded-3xl p-12 text-center">
        <h2 className="font-serif text-3xl font-bold text-royal-brown mb-4">
          Stay Updated with Sweet Stories
        </h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter and get the latest articles, recipes, and sweet updates delivered directly to your inbox.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:border-royal-gold focus:outline-none"
          />
          <Button className="bg-royal-gold hover:bg-royal-darkGold px-8">
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
