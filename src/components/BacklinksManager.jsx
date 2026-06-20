import React, { useState, useEffect } from 'react';
import { playSound } from '../utils/audio.js';
import { 
  Link2, 
  ExternalLink, 
  ShieldCheck, 
  ShieldAlert, 
  Copy, 
  Check, 
  Plus, 
  Trash2, 
  HelpCircle, 
  Info,
  Globe,
  Settings,
  Sparkles,
  RefreshCw,
  Search
} from 'lucide-react';
import { motion } from 'motion/react';

export default function BacklinksManager({ theme }) {
  // Backlink list state (initialized with high-quality real SEO learning/developer resources)
  const defaultSeeds = [
    { id: 'ref-1', url: 'https://developers.google.com/search', anchor: 'Google Search Central', type: 'nofollow', desc: 'Google official documentation for search optimization' },
    { id: 'ref-2', url: 'https://schema.org', anchor: 'Schema.org Structured Data', type: 'dofollow', desc: 'Collaborative community defining schemas for web structures' },
    { id: 'ref-3', url: 'https://validator.w3.org', anchor: 'W3C Markup Validator', type: 'dofollow', desc: 'Standard service to validate HTML web pages compliance' },
    { id: 'ref-4', url: 'https://moz.com/learn/seo', anchor: 'Moz SEO Learning Center', type: 'nofollow', desc: 'Comprehensive guide library covering backlinks authority' }
  ];

  const [backlinks, setBacklinks] = useState([]);
  const [copiedId, setCopiedId] = useState(null);
  const [activeTab, setActiveTab] = useState('manager'); // 'manager' | 'explain'

  // Form input states
  const [inputUrl, setInputUrl] = useState('');
  const [inputAnchor, setInputAnchor] = useState('');
  const [inputType, setInputType] = useState('dofollow'); // 'dofollow' | 'nofollow'
  const [inputDesc, setInputDesc] = useState('');

  // Live generator outputs
  const [testUrl, setTestUrl] = useState('https://myportfolio.com');
  const [testAnchor, setTestAnchor] = useState('My Developer Portfolio');
  const [testType, setTestType] = useState('dofollow');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('omni_calc_backlinks');
      if (stored) {
        setBacklinks(JSON.parse(stored));
      } else {
        setBacklinks(defaultSeeds);
        localStorage.setItem('omni_calc_backlinks', JSON.stringify(defaultSeeds));
      }
    } catch (e) {
      console.warn('Failed to load backlinks from storage', e);
      setBacklinks(defaultSeeds);
    }
  }, []);

  const saveBacklinks = (list) => {
    setBacklinks(list);
    try {
      localStorage.setItem('omni_calc_backlinks', JSON.stringify(list));
    } catch (e) {
      console.error('Failed to save backlinks', e);
    }
  };

  const handleAddBacklink = (e) => {
    e.preventDefault();
    if (!inputUrl || !inputAnchor) {
      playSound('error');
      return;
    }

    // Sanitize URL prefix
    let formattedUrl = inputUrl.trim();
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = 'https://' + formattedUrl;
    }

    const newLink = {
      id: 'backlink-' + Math.random().toString(36).substring(2, 9),
      url: formattedUrl,
      anchor: inputAnchor.trim(),
      type: inputType,
      desc: inputDesc.trim() || 'Custom added user project link'
    };

    const updated = [newLink, ...backlinks];
    saveBacklinks(updated);
    playSound('success');

    // Reset fields
    setInputUrl('');
    setInputAnchor('');
    setInputDesc('');
  };

  const handleDeleteBacklink = (id) => {
    playSound('tick');
    const filtered = backlinks.filter(b => b.id !== id);
    saveBacklinks(filtered);
  };

  const handleToggleType = (id) => {
    playSound('click');
    const updated = backlinks.map(b => {
      if (b.id === id) {
        return { ...b, type: b.type === 'dofollow' ? 'nofollow' : 'dofollow' };
      }
      return b;
    });
    saveBacklinks(updated);
  };

  const handleCopyCode = (linkCode, id) => {
    navigator.clipboard.writeText(linkCode);
    playSound('success');
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  // Helper code renderer
  const generateHtmlCode = (url, anchor, type) => {
    const relTag = type === 'nofollow' ? ' rel="nofollow"' : '';
    return `<a href="${url}" target="_blank"${relTag}>${anchor}</a>`;
  };

  return (
    <div className={`p-6 rounded-2xl border ${theme.cardBg} transition-all duration-300 relative overflow-hidden shadow-2xl`}>
      {/* Accent Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Heading Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800/60 gap-4 mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-teal-950/40 border border-teal-800/50 rounded-2xl text-teal-400">
            <Link2 className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
              SEO Backlink Hub & Generator
              <span className="text-[10px] uppercase font-bold py-0.5 px-2 bg-teal-500/10 text-teal-300 rounded border border-teal-500/20">REL Tag Manager</span>
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
              Construct search engine compliant hyperlinks for your projects. Dynamically configure and inspect <strong>Do-Follow</strong> and <strong>No-Follow</strong> attributes with code export functionality.
            </p>
          </div>
        </div>

        {/* Option Tabs */}
        <div className="flex gap-1.5 self-start md:self-center">
          <button
            onClick={() => { playSound('tick'); setActiveTab('manager'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'manager' 
                ? 'bg-teal-500/15 border border-teal-500/40 text-teal-300 shadow-sm' 
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent'
            }`}
          >
            Manager & Tool
          </button>
          <button
            onClick={() => { playSound('tick'); setActiveTab('explain'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'explain' 
                ? 'bg-teal-500/15 border border-teal-500/40 text-teal-300 shadow-sm' 
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent'
            }`}
          >
            Learn the Difference
          </button>
        </div>
      </div>

      {activeTab === 'manager' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
          
          {/* LEFT PANEL: Interactive Code Generator Form & Creator */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-4 rounded-xl border border-slate-800/80 bg-slate-950/40 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-200 flex items-center gap-1.5 border-b border-slate-800/80 pb-2">
                <Settings className="w-3.5 h-3.5 text-teal-400" /> Backlink Creator Form
              </h3>
              
              <form onSubmit={handleAddBacklink} className="space-y-3.5">
                <div>
                  <label htmlFor="backlink-url-input" className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Target Project URL</label>
                  <div className="relative flex items-center bg-slate-950/80 border border-slate-800 rounded-lg px-2.5 py-1.5 focus-within:border-teal-500 transition-colors">
                    <Globe className="w-3.5 h-3.5 text-teal-500/60 mr-2 shrink-0" />
                    <input 
                      id="backlink-url-input"
                      type="text" 
                      placeholder="e.g. https://mycoolapp.com"
                      value={inputUrl}
                      onChange={(e) => setInputUrl(e.target.value)}
                      className="bg-transparent text-slate-100 placeholder-slate-600 outline-none text-xs w-full font-sans"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="backlink-anchor-input" className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Anchor Text (Linked Text)</label>
                  <div className="relative flex items-center bg-slate-950/80 border border-slate-800 rounded-lg px-2.5 py-1.5 focus-within:border-teal-500 transition-colors">
                    <span className="text-[11px] font-mono text-teal-500/60 mr-2 shrink-0">&lt;a&gt;</span>
                    <input 
                      id="backlink-anchor-input"
                      type="text" 
                      placeholder="e.g. Free Color Generator Tool"
                      value={inputAnchor}
                      onChange={(e) => setInputAnchor(e.target.value)}
                      className="bg-transparent text-slate-100 placeholder-slate-600 outline-none text-xs w-full font-sans"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Link Classification</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => { playSound('tick'); setInputType('dofollow'); }}
                      className={`py-1.5 rounded-lg border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        inputType === 'dofollow' 
                          ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-400' 
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-300'
                      }`}
                    >
                      <ShieldCheck className="w-3.5 h-3.5" /> Do-Follow
                    </button>
                    <button
                      type="button"
                      onClick={() => { playSound('tick'); setInputType('nofollow'); }}
                      className={`py-1.5 rounded-lg border text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        inputType === 'nofollow' 
                          ? 'bg-amber-950/40 border-amber-500/50 text-amber-400' 
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-300'
                      }`}
                    >
                      <ShieldAlert className="w-3.5 h-3.5" /> No-Follow
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="backlink-desc-input" className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Brief Description (Optional)</label>
                  <input 
                    id="backlink-desc-input"
                    type="text" 
                    placeholder="e.g. Showcase link in directory footer"
                    value={inputDesc}
                    onChange={(e) => setInputDesc(e.target.value)}
                    className="bg-slate-950/80 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-150 placeholder-slate-600 outline-none w-full"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-tr from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-slate-950 font-bold py-2 rounded-lg transition-all shadow-md cursor-pointer text-xs"
                >
                  <Plus className="w-4 h-4 shrink-0" />
                  Add to Backlinks Index
                </button>
              </form>
            </div>

            {/* Instant Sandbox Sandbox Panel */}
            <div className="p-4 rounded-xl border border-slate-800 bg-black/20 space-y-3">
              <div className="flex justify-between items-center border-b border-slate-800/60 pb-2">
                <h4 className="text-[10px] uppercase font-black text-slate-400 tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-teal-400" /> Interactive HTML Previewer
                </h4>
                <span className="text-[9px] px-1.5 py-0.5 bg-slate-850 border border-slate-800 text-slate-400 font-mono rounded">sandbox</span>
              </div>

              <div className="space-y-3 text-xs leading-relaxed">
                <div>
                  <span className="text-[10px] text-slate-500 block mb-1">Sandbox Input Target</span>
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    <input 
                      type="text" 
                      value={testAnchor} 
                      aria-label="Sandbox Anchor Text"
                      onChange={(e) => setTestAnchor(e.target.value)} 
                      className="bg-slate-950/80 border border-slate-800 p-1.5 rounded text-slate-200 outline-none focus:border-teal-500" 
                      placeholder="Anchor text"
                    />
                    <select 
                      value={testType} 
                      aria-label="Sandbox Link Type"
                      onChange={(e) => setTestType(e.target.value)} 
                      className="bg-slate-950 border border-slate-800 p-1 rounded text-slate-200 outline-none"
                    >
                      <option value="dofollow">Do-Follow (Standard)</option>
                      <option value="nofollow">No-Follow (Search Safe)</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-850">
                  <span className="text-[9px] text-slate-500 block mb-1 uppercase font-bold">Compiled HTML output code:</span>
                  <code className="text-[10px] block font-mono text-emerald-400 bg-black/40 p-2 rounded border border-emerald-950 select-all overflow-x-auto whitespace-nowrap">
                    {generateHtmlCode(testUrl, testAnchor, testType)}
                  </code>

                  <div className="flex justify-end gap-1.5 mt-2">
                    <button
                      onClick={() => handleCopyCode(generateHtmlCode(testUrl, testAnchor, testType), 'sandbox-copy')}
                      className="p-1 px-2 rounded bg-slate-900 hover:bg-slate-800 border border-slate-850 text-[10px] font-bold text-slate-350 hover:text-white flex items-center gap-1 transition-all"
                    >
                      {copiedId === 'sandbox-copy' ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          Copied Code!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          Copy HTML
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="p-2.5 bg-emerald-500/5 rounded-lg border border-emerald-500/10 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Rendered clickable link:</span>
                  <a 
                    href={testUrl} 
                    target="_blank" 
                    rel={testType === 'nofollow' ? 'nofollow' : undefined}
                    onClick={(e) => { playSound('success'); console.log('Simulating link click with rel:', testType); }}
                    className="text-xs font-bold text-teal-400 hover:text-teal-300 underline flex items-center gap-1"
                  >
                    {testAnchor || 'Link'} <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT PANEL: Backlinks Index and Table */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-teal-400" /> Configured Backlinks Directory ({backlinks.length})
              </h3>
              <button 
                onClick={() => { playSound('success'); saveBacklinks(defaultSeeds); }}
                className="text-[9px] uppercase font-bold text-slate-500 hover:text-teal-400 flex items-center gap-1 bg-transparent border-0 cursor-pointer"
                title="Reset to default seed links list"
              >
                <RefreshCw className="w-2.5 h-2.5" /> Reset Defaults
              </button>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-950/40 divide-y divide-slate-800/80">
              {backlinks.length === 0 ? (
                <div className="py-12 text-center text-slate-500 text-xs">
                  Your directories file indexes are empty. Use the creator form to compile a backlink.
                </div>
              ) : (
                backlinks.map((link) => {
                  const htmlCode = generateHtmlCode(link.url, link.anchor, link.type);
                  const isCopied = copiedId === link.id;

                  return (
                    <div key={link.id} className="p-3.5 hover:bg-slate-900/30 transition-all space-y-2">
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-0.5 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-100 text-xs truncate max-w-[200px] sm:max-w-[320px]">
                              {link.anchor}
                            </span>
                            
                            {/* Toggle Badge */}
                            <button
                              onClick={() => handleToggleType(link.id)}
                              className={`px-1.5 py-0.5 rounded border text-[9px] font-bold tracking-wider uppercase transition-all flex items-center gap-1 shrink-0 ${
                                link.type === 'dofollow' 
                                  ? 'bg-emerald-950/40 border-emerald-500/20 text-emerald-400 hover:bg-emerald-900/40' 
                                  : 'bg-amber-950/40 border-amber-500/20 text-amber-400 hover:bg-amber-900/40'
                              }`}
                              title={`Click to change this to ${link.type === 'dofollow' ? 'No-Follow' : 'Do-Follow'}`}
                            >
                              {link.type === 'dofollow' ? (
                                <>
                                  <ShieldCheck className="w-2.5 h-2.5" /> Do-Follow
                                </>
                              ) : (
                                <>
                                  <ShieldAlert className="w-2.5 h-2.5" /> No-Follow
                                </>
                              )}
                            </button>
                          </div>
                          
                          <p className="text-[10px] text-slate-500 truncate" title={link.url}>
                            {link.url}
                          </p>
                        </div>

                        {/* Actions Row */}
                        <div className="flex items-center gap-1 shrink-0">
                          {/* Live clickable test */}
                          <a 
                            href={link.url} 
                            target="_blank" 
                            rel={link.type === 'nofollow' ? 'nofollow' : undefined}
                            onClick={() => playSound('success')}
                            className="p-1 px-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[10px] font-bold text-slate-400 hover:text-white flex items-center gap-1 transition-all"
                            title="Open URL in new tab"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>

                          {/* Copy code button */}
                          <button
                            onClick={() => handleCopyCode(htmlCode, link.id)}
                            className={`p-1 px-1.5 rounded border text-[10px] font-bold flex items-center gap-1 transition-all ${
                              isCopied 
                                ? 'bg-emerald-950 border-emerald-500/40 text-emerald-400' 
                                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                            }`}
                            title="Copy HTML link code to clipboard"
                          >
                            {isCopied ? <Check className="w-3 h-3 animate-scale" /> : <Copy className="w-3 h-3" />}
                          </button>

                          {/* Delete option */}
                          <button
                            onClick={() => handleDeleteBacklink(link.id)}
                            className="p-1 px-1.5 rounded bg-slate-900/60 hover:bg-rose-950 border border-transparent hover:border-rose-900/40 text-slate-500 hover:text-rose-400 transition-all shrink-0 cursor-pointer"
                            title="Delete this backlink"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {link.desc && (
                        <p className="text-[10px] text-slate-400/85 leading-relaxed bg-black/10 px-2 py-1 rounded border border-slate-900 italic">
                          {link.desc}
                        </p>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Micro instructional tooltip footer */}
            <div className="bg-teal-950/10 border border-teal-500/10 rounded-xl p-3 flex gap-2.5 text-[10px] leading-relaxed text-teal-300">
              <Info className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
              <span>
                <strong>Quick Tip:</strong> You can click on the list type button (e.g. <code>Do-Follow</code> or <code>No-Follow</code>) to switch their classification instantly and notice how the generated anchor output tag code is updated. Try testing it on different projects you run!
              </span>
            </div>
          </div>

        </div>
      ) : (
        /* --- LEARN THE DIFFERENCE COMPREHENSIVE VIEW --- */
        <div className="space-y-6 relative z-10 text-xs">
          <div className="bg-slate-950/40 rounded-xl p-5 border border-slate-800 space-y-4">
            <h3 className="font-extrabold text-white text-sm flex items-center gap-2 border-b border-slate-800 pb-2">
              <Info className="w-4 h-4 text-teal-400" /> What are Link Attributes in Modern Web SEO?
            </h3>
            <p className="text-slate-400 leading-relaxed">
              When search motor spiders (like GoogleBot) process web pages, they traverse outbound links to discover other websites. By default, every hyperlink transmits SEO crawl authority and "domain link juice" from your site to the target page. Link attributes let you specify how crawler bots should classify this connection.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
              <div className="p-4 rounded-xl border border-emerald-900/30 bg-emerald-950/10 space-y-2">
                <h4 className="font-bold text-emerald-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> 1. Do-Follow Backlinks
                </h4>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  <strong>What they represent:</strong> A standard, unaltered hyperlink. No special relation attribute is added (some users mistakenly add <code>rel="dofollow"</code> but in valid XML it is simply omitted).
                </p>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  <strong>SEO Treatment:</strong> Search bot crawlers follow the link and transfer organic link authority ("crawling juice"). Highly valuable for boosting organic ranks of trusted partner apps.
                </p>
                <div className="p-2 bg-black/40 rounded border border-emerald-900/40 text-[10px] font-mono text-slate-350">
                  Code: <code>&lt;a href="https://site.com"&gt;Anchor Name&lt;/a&gt;</code>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-amber-900/30 bg-amber-950/10 space-y-2">
                <h4 className="font-bold text-amber-400 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4" /> 2. No-Follow Backlinks
                </h4>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  <strong>What they represent:</strong> Hyperlinks configured with the attribute value <code>rel="nofollow"</code>. It informs crawler engines that you don't necessarily support or endorse the target URL.
                </p>
                <p className="text-slate-400 leading-relaxed text-[11px]">
                  <strong>SEO Treatment:</strong> Introduced by Google to counteract spam. Crawlers do not transfer ranking page authority over this link node. Useful for comments, user profiles, or paid sponsorships.
                </p>
                <div className="p-2 bg-black/40 rounded border border-amber-900/40 text-[10px] font-mono text-slate-350">
                  Code: <code>&lt;a href="https://site.com" rel="nofollow"&gt;Anchor&lt;/a&gt;</code>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 space-y-3">
            <h4 className="font-bold text-white flex items-center gap-1.5 text-xs">
              <Globe className="w-4 h-4 text-teal-400" /> Best Practices for Backlinking Your Projects
            </h4>
            <ul className="space-y-2 text-slate-450 text-[11px] list-disc pl-4 leading-relaxed">
              <li>
                <strong className="text-slate-200">Balance is Key:</strong> Healthy organic backlinking structures contain a natural ratio of both Do-Follow and No-Follow references. Spanning hundreds of solely do-follow links suddenly looks artificial to Google algorithms.
              </li>
              <li>
                <strong className="text-slate-200">Anchor Context:</strong> Make sure anchor texts are highly descriptive. Instead of linking with generic words like <code className="text-slate-400">"click here"</code>, use literal tags like <code className="text-slate-400">"high precision fraction calculator tools"</code> to help search indexes understand what the target page is about.
              </li>
              <li>
                <strong className="text-slate-200">Affiliate / Paid Links:</strong> Always configure affiliate, paid links, or sponsored nodes with either <code>rel="sponsored"</code> or <code>rel="nofollow"</code> to remain fully compliant with Google Webmaster policies.
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
