import React, { useState, useRef } from 'react';
import { 
  Bold, Italic, Strikethrough, List, ListOrdered, Link, Image, 
  AlignLeft, AlignCenter, AlignRight, Smile, X, Plus, Check,
  Upload, Eye, Code, Quote, AlertCircle, Zap, Target, Users
} from 'lucide-react';

export const AskQuestionForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: []
  });
  
  const [errors, setErrors] = useState({});
  const [isPreview, setIsPreview] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const [currentSelection, setCurrentSelection] = useState({ start: 0, end: 0 });
  
  const descriptionRef = useRef(null);
  const fileInputRef = useRef(null);
  
  // Popular tags for suggestions
  const popularTags = [
    'React', 'JavaScript', 'Node.js', 'Python', 'Java', 'TypeScript',
    'MongoDB', 'Express', 'SQL', 'HTML', 'CSS', 'Vue.js', 'Angular',
    'Docker', 'AWS', 'Git', 'REST API', 'GraphQL', 'Redux', 'Next.js',
    'Spring Boot', 'PostgreSQL', 'MySQL', 'Redis', 'Kubernetes',
    'Flutter', 'React Native', 'Swift', 'Kotlin', 'PHP', 'Laravel'
  ];
  
  const filteredTags = popularTags.filter(tag => 
    tag.toLowerCase().includes(tagInput.toLowerCase()) &&
    !formData.tags.includes(tag)
  );

  const handleTitleChange = (e) => {
    setFormData({ ...formData, title: e.target.value });
    if (errors.title) {
      setErrors({ ...errors, title: '' });
    }
  };

  const handleDescriptionChange = (e) => {
    setFormData({ ...formData, description: e.target.value });
    if (errors.description) {
      setErrors({ ...errors, description: '' });
    }
  };

  const handleSelection = () => {
    if (descriptionRef.current) {
      const start = descriptionRef.current.selectionStart;
      const end = descriptionRef.current.selectionEnd;
      setCurrentSelection({ start, end });
    }
  };

  const insertText = (before, after = '') => {
    const textarea = descriptionRef.current;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const newText = before + selectedText + after;
    
    const newValue = textarea.value.substring(0, start) + newText + textarea.value.substring(end);
    setFormData({ ...formData, description: newValue });
    
    // Set cursor position after insertion
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };

  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    strikethrough: false,
    code: false,
    ul: false,
    ol: false,
    quote: false
  });

  const formatText = (type) => {
    setActiveFormats(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
    
    setTimeout(() => {
      setActiveFormats(prev => ({
        ...prev,
        [type]: false
      }));
    }, 150);

    switch (type) {
      case 'bold':
        insertText('**', '**');
        break;
      case 'italic':
        insertText('*', '*');
        break;
      case 'strikethrough':
        insertText('~~', '~~');
        break;
      case 'code':
        insertText('`', '`');
        break;
      case 'quote':
        insertText('> ');
        break;
      case 'link':
        const url = prompt('Enter URL:');
        if (url) insertText('[', `](${url})`);
        break;
      case 'ul':
        insertText('• ');
        break;
      case 'ol':
        insertText('1. ');
        break;
      case 'emoji':
        insertText('😊 ');
        break;
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        insertText(`![Image](${imageUrl})`);
      };
      reader.readAsDataURL(file);
    }
  };

  const addTag = (tag) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData({ ...formData, tags: [...formData.tags, tag] });
      setTagInput('');
      setShowTagSuggestions(false);
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleTagInputKeyPress = (e) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      addTag(tagInput.trim());
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 10) {
      newErrors.title = 'Title must be at least 10 characters long';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters long';
    }
    
    if (formData.tags.length === 0) {
      newErrors.tags = 'At least one tag is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('Form submitted:', formData);
      alert('Question submitted successfully!');
      // Reset form
      setFormData({ title: '', description: '', tags: [] });
    }
  };

  const renderPreview = () => {
    let html = formData.description;
    
    // Convert markdown-like syntax to HTML
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/~~(.*?)~~/g, '<del>$1</del>');
    html = html.replace(/`(.*?)`/g, '<code class="bg-slate-100 px-2 py-1 rounded font-mono text-sm">$1</code>');
    html = html.replace(/^> (.*$)/gm, '<blockquote class="border-l-4 border-indigo-300 pl-4 italic text-slate-600">$1</blockquote>');
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-indigo-600 hover:text-indigo-800 underline">$1</a>');
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-2" />');
    html = html.replace(/^• (.*$)/gm, '<li>$1</li>');
    html = html.replace(/^(\d+)\. (.*$)/gm, '<li>$1</li>');
    html = html.replace(/\n/g, '<br>');
    
    return { __html: html };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pb-12">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
                <Target className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Ask a Question
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Get help from our amazing community of developers. Share your challenge and discover solutions together.
            </p>
            <div className="flex justify-center items-center mt-6 space-x-6 text-blue-100">
              <div className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span className="text-sm">10k+ Developers</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span className="text-sm">Fast Response</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto p-6 -mt-8 relative">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/30 overflow-hidden">
          <div className="p-8 space-y-8">
            {/* Title Input */}
            <div className="space-y-3">
              <label htmlFor="title" className="block text-sm font-semibold text-slate-700">
                Question Title *
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="e.g., How do I implement JWT authentication in React?"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                  errors.title ? 'border-red-400 bg-red-50' : 'border-slate-200 hover:border-slate-300'
                }`}
              />
              {errors.title && (
                <p className="text-red-500 text-sm flex items-center bg-red-50 p-2 rounded-lg">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {errors.title}
                </p>
              )}
              <p className="text-sm text-slate-500">
                💡 Be specific and clear. Good titles help others understand your question quickly.
              </p>
            </div>

            {/* Description Editor */}
            <div className="space-y-3">
              <label htmlFor="description" className="block text-sm font-semibold text-slate-700">
                Question Description *
              </label>
              
              {/* Toolbar */}
              <div className="border-2 border-slate-200 rounded-t-xl bg-gradient-to-r from-slate-50 to-slate-100 p-3">
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-lg p-1 shadow-sm">
                    <button
                      type="button"
                      onClick={() => formatText('bold')}
                      className={`p-2 rounded-md transition-all duration-150 ${
                        activeFormats.bold 
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-110' 
                          : 'hover:bg-indigo-50 text-slate-600 hover:text-slate-800'
                      }`}
                      title="Bold"
                    >
                      <Bold className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => formatText('italic')}
                      className={`p-2 rounded-md transition-all duration-150 ${
                        activeFormats.italic 
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-110' 
                          : 'hover:bg-indigo-50 text-slate-600 hover:text-slate-800'
                      }`}
                      title="Italic"
                    >
                      <Italic className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => formatText('strikethrough')}
                      className={`p-2 rounded-md transition-all duration-150 ${
                        activeFormats.strikethrough 
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-110' 
                          : 'hover:bg-indigo-50 text-slate-600 hover:text-slate-800'
                      }`}
                      title="Strikethrough"
                    >
                      <Strikethrough className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => formatText('code')}
                      className={`p-2 rounded-md transition-all duration-150 ${
                        activeFormats.code 
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-110' 
                          : 'hover:bg-indigo-50 text-slate-600 hover:text-slate-800'
                      }`}
                      title="Code"
                    >
                      <Code className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-lg p-1 shadow-sm">
                    <button
                      type="button"
                      onClick={() => formatText('ul')}
                      className={`p-2 rounded-md transition-all duration-150 ${
                        activeFormats.ul 
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-110' 
                          : 'hover:bg-indigo-50 text-slate-600 hover:text-slate-800'
                      }`}
                      title="Bullet List"
                    >
                      <List className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => formatText('ol')}
                      className={`p-2 rounded-md transition-all duration-150 ${
                        activeFormats.ol 
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-110' 
                          : 'hover:bg-indigo-50 text-slate-600 hover:text-slate-800'
                      }`}
                      title="Numbered List"
                    >
                      <ListOrdered className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => formatText('quote')}
                      className={`p-2 rounded-md transition-all duration-150 ${
                        activeFormats.quote 
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-110' 
                          : 'hover:bg-indigo-50 text-slate-600 hover:text-slate-800'
                      }`}
                      title="Quote"
                    >
                      <Quote className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-lg p-1 shadow-sm">
                    <button
                      type="button"
                      onClick={() => formatText('link')}
                      className="p-2 rounded-md hover:bg-indigo-50 transition-all duration-150 text-slate-600 hover:text-slate-800"
                      title="Link"
                    >
                      <Link className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2 rounded-md hover:bg-indigo-50 transition-all duration-150 text-slate-600 hover:text-slate-800"
                      title="Upload Image"
                    >
                      <Image className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => formatText('emoji')}
                      className="p-2 rounded-md hover:bg-indigo-50 transition-all duration-150 text-slate-600 hover:text-slate-800"
                      title="Emoji"
                    >
                      <Smile className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => setIsPreview(!isPreview)}
                      className={`p-2 rounded-lg transition-all duration-200 ${
                        isPreview 
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg' 
                          : 'bg-white text-slate-600 hover:bg-slate-100 shadow-sm'
                      }`}
                      title="Preview"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Text Area / Preview */}
              {isPreview ? (
                <div className="border-2 border-slate-200 rounded-b-xl p-4 min-h-[200px] bg-white">
                  <div className="prose max-w-none text-slate-700" dangerouslySetInnerHTML={renderPreview()} />
                </div>
              ) : (
                <textarea
                  ref={descriptionRef}
                  id="description"
                  value={formData.description}
                  onChange={handleDescriptionChange}
                  onSelect={handleSelection}
                  placeholder="Describe your problem in detail. Include what you've tried, what you expected, and what actually happened..."
                  rows={10}
                  className={`w-full px-4 py-3 border-2 border-slate-200 rounded-b-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-vertical transition-all duration-200 ${
                    errors.description ? 'border-red-400 bg-red-50' : 'hover:border-slate-300'
                  }`}
                />
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              
              {errors.description && (
                <p className="text-red-500 text-sm flex items-center bg-red-50 p-2 rounded-lg">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {errors.description}
                </p>
              )}
              <p className="text-sm text-slate-500">
                ✨ Use markdown syntax for formatting. Include code snippets, error messages, and relevant details.
              </p>
            </div>

            {/* Tags Input */}
            <div className="space-y-3">
              <label htmlFor="tags" className="block text-sm font-semibold text-slate-700">
                Tags *
              </label>
              
              {/* Selected Tags */}
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 border border-indigo-200 shadow-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-indigo-500 hover:text-indigo-700 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              
              {/* Tag Input */}
              <div className="relative">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => {
                    setTagInput(e.target.value);
                    setShowTagSuggestions(e.target.value.length > 0);
                  }}
                  onKeyPress={handleTagInputKeyPress}
                  onFocus={() => setShowTagSuggestions(tagInput.length > 0)}
                  placeholder="Type to search tags or add new ones..."
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                    errors.tags ? 'border-red-400 bg-red-50' : 'border-slate-200 hover:border-slate-300'
                  }`}
                />
                
                {/* Tag Suggestions */}
                {showTagSuggestions && filteredTags.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-xl shadow-xl max-h-48 overflow-y-auto">
                    {filteredTags.slice(0, 10).map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => addTag(tag)}
                        className="w-full px-4 py-2 text-left hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 focus:bg-gradient-to-r focus:from-indigo-50 focus:to-purple-50 focus:outline-none transition-all duration-150"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {errors.tags && (
                <p className="text-red-500 text-sm flex items-center bg-red-50 p-2 rounded-lg">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {errors.tags}
                </p>
              )}
              <p className="text-sm text-slate-500">
                🏷️ Add up to 5 tags to help others find your question. Press Enter to add a tag.
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => {
                  setFormData({ title: '', description: '', tags: [] });
                  setErrors({});
                }}
                className="px-6 py-3 border-2 border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Post Question
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

