"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { animate, stagger } from "animejs";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Linkedin, Github, Twitter, ArrowUpRight, Sparkles } from "lucide-react";
import SectionReveal from "@/components/SectionReveal";
import { triggerParticleBurst } from "@/utils/animeEffects";

type FormField = "name" | "email" | "subject" | "message";

const contactInfo = [
  {
    icon: <Mail size={18} />,
    label: "Email",
    value: "saikrishnakotagiri16@gmail.com",
    href: "mailto:saikrishnakotagiri16@gmail.com",
    color: "#7c3aed",
    glow: "rgba(124,58,237,0.25)",
  },
  {
    icon: <Phone size={18} />,
    label: "Phone",
    value: "+91 9989966415",
    href: "tel:+919989966415",
    color: "#06b6d4",
    glow: "rgba(6,182,212,0.25)",
  },
  {
    icon: <MapPin size={18} />,
    label: "Location",
    value: "Hyderabad, India (Remote)",
    href: null,
    color: "#ec4899",
    glow: "rgba(236,72,153,0.25)",
  },
];

const socials = [
  { icon: <Linkedin size={18} />, label: "LinkedIn", href: "https://linkedin.com/in/saikrishna-kotagiri" },
  { icon: <Github size={18} />, label: "GitHub", href: "https://github.com/saikrishna6415" },
  { icon: <Twitter size={18} />, label: "Twitter", href: "https://twitter.com/name__is_sai" },
];

function InputField({
  id,
  label,
  type = "text",
  value,
  error,
  touched,
  onChange,
  onFocus,
  onBlur,
  inputRef,
  rows,
}: {
  id: FormField;
  label: string;
  type?: string;
  value: string;
  error?: string;
  touched: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onFocus?: () => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  rows?: number;
}) {
  const isValid = touched && !error && value.length > 0;
  const isError = touched && !!error;
  const elRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onFocus) onFocus();
    animate(e.currentTarget, {
      borderColor: ["rgba(255,255,255,0.08)", "#7c3aed"],
      boxShadow: ["0 0 0px rgba(124,58,237,0)", "0 0 20px rgba(124,58,237,0.3)"],
      duration: 400,
      easing: "outQuad",
    });
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onBlur) onBlur(e);
    if (!isError && !isValid) {
      animate(e.currentTarget, {
        borderColor: "rgba(255,255,255,0.08)",
        boxShadow: "0 0 0px rgba(0,0,0,0)",
        duration: 300,
        easing: "outQuad",
      });
    }
  };

  const baseStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.875rem 1rem",
    background: "rgba(255,255,255,0.03)",
    border: `1px solid ${isError ? "rgba(239,68,68,0.5)" : isValid ? "rgba(16,185,129,0.5)" : "rgba(255,255,255,0.08)"}`,
    borderRadius: "0.75rem",
    outline: "none",
    color: "var(--text-primary)",
    fontSize: "0.9rem",
    fontFamily: "inherit",
    transition: "all 0.2s ease",
    resize: rows ? ("none" as const) : undefined,
  };

  const commonProps = {
    id,
    name: id,
    value,
    onChange,
    onFocus: handleInputFocus,
    onBlur: handleInputBlur,
    required: true,
    style: baseStyle,
  };

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-mono tracking-wider uppercase" style={{ color: "var(--text-muted)" }}>
        {label}
      </label>
      {rows ? (
        <textarea {...commonProps} rows={rows} />
      ) : (
        <input
          {...commonProps}
          type={type}
          ref={(node) => {
            elRef.current = node;
            if (inputRef) {
              (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
            }
          }}
        />
      )}
      <AnimatePresence>
        {isError && (
          <motion.p
            className="text-xs flex items-center gap-1"
            style={{ color: "rgb(239,68,68)" }}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
          >
            <AlertCircle size={11} />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const infoCardsRef = useRef<HTMLDivElement>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const nameRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<Record<FormField, string>>({
    name: "", email: "", subject: "", message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<FormField, string>>>({});
  const [touched, setTouched] = useState<Record<FormField, boolean>>({
    name: false, email: false, subject: false, message: false,
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    if (inView && infoCardsRef.current) {
      animate(infoCardsRef.current.children, {
        opacity: [0, 1],
        translateX: [-30, 0],
        duration: 700,
        delay: stagger(100),
        easing: "outElastic(1, .8)",
      });
    }
  }, [inView]);

  const validate = (field: FormField, val: string) => {
    if (field === "name") return val.trim().length < 2 ? "At least 2 characters required" : "";
    if (field === "email") return !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(val) ? "Valid email required" : "";
    if (field === "subject") return val.trim().length < 3 ? "At least 3 characters required" : "";
    if (field === "message") return val.trim().length < 10 ? "At least 10 characters required" : "";
    return "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(p => ({ ...p, [name]: value }));
    if (touched[name as FormField]) {
      setErrors(p => ({ ...p, [name]: validate(name as FormField, value) }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(p => ({ ...p, [name]: true }));
    setErrors(p => ({ ...p, [name]: validate(name as FormField, value) }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fields: FormField[] = ["name", "email", "subject", "message"];
    const newErrors = Object.fromEntries(fields.map(f => [f, validate(f, formData[f])])) as Record<FormField, string>;
    setTouched({ name: true, email: true, subject: true, message: true });
    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) return;

    setStatus("submitting");
    try {
      const res = await fetch("https://formspree.io/f/xldlpbkq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus("success");
        if (submitBtnRef.current) {
          triggerParticleBurst(submitBtnRef.current, { count: 32, distance: 120 });
        }
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTouched({ name: false, email: false, subject: false, message: false });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 5000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden" style={{ background: "var(--background)" }}>
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] opacity-20"
          style={{ background: "radial-gradient(ellipse, rgba(124,58,237,0.2) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] opacity-10"
          style={{ background: "radial-gradient(circle at 100% 100%, rgba(6,182,212,0.2) 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={sectionRef}>
        {/* Section label */}
        <motion.div className="section-label mb-6"
          initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5 }}>
          Get In Touch
        </motion.div>

        <div className="mb-4">
          <SectionReveal>
            <h2 className="font-display font-bold text-white"
              style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}>
              Let&apos;s Build{" "}
              <span className="bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #a78bfa, #06b6d4)" }}>
                Something Great
              </span>
            </h2>
          </SectionReveal>
        </div>

        <motion.p className="mb-14 max-w-xl text-base" style={{ color: "var(--text-secondary)" }}
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}>
          Have a project in mind or just want to chat? I&apos;m always open to new opportunities and creative collaborations.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* ── Left: Info panel ── */}
          <div ref={infoCardsRef} className="lg:col-span-2 space-y-5">
            {/* Contact cards */}
            {contactInfo.map((item) => (
              <div key={item.label} className="opacity-0">
                {item.href ? (
                  <a href={item.href} target={item.href.startsWith("mailto") || item.href.startsWith("tel") ? undefined : "_blank"}
                    rel="noopener noreferrer" className="group flex items-center gap-4 p-4 rounded-xl transition-all duration-300"
                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
                    onMouseEnter={e => {
                      animate(e.currentTarget, {
                        translateX: 6,
                        duration: 250,
                        easing: "outQuad",
                      });
                      (e.currentTarget as HTMLElement).style.borderColor = `${item.color}35`;
                      (e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${item.glow}`;
                    }}
                    onMouseLeave={e => {
                      animate(e.currentTarget, {
                        translateX: 0,
                        duration: 250,
                        easing: "outQuad",
                      });
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.06)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${item.color}18`, color: item.color }}>
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-mono tracking-widest uppercase mb-0.5" style={{ color: "var(--text-muted)" }}>{item.label}</div>
                      <div className="text-sm text-white truncate group-hover:text-white transition-colors">{item.value}</div>
                    </div>
                    <ArrowUpRight size={14} className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: item.color }} />
                  </a>
                ) : (
                  <div className="flex items-center gap-4 p-4 rounded-xl"
                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: `${item.color}18`, color: item.color }}>
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-[10px] font-mono tracking-widest uppercase mb-0.5" style={{ color: "var(--text-muted)" }}>{item.label}</div>
                      <div className="text-sm text-white">{item.value}</div>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Social links */}
            <div className="opacity-0">
              <div className="text-[10px] font-mono tracking-widest uppercase mb-3" style={{ color: "var(--text-muted)" }}>Connect</div>
              <div className="flex gap-2">
                {socials.map(s => (
                  <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                    className="w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "var(--text-secondary)" }}
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(124,58,237,0.15)", borderColor: "rgba(124,58,237,0.4)", color: "#a78bfa" }}>
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability card */}
            <div className="p-4 rounded-xl opacity-0"
              style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)" }}>
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <div>
                  <div className="text-sm font-semibold text-emerald-400">Available for work</div>
                  <div className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>Open to full-time & freelance</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Contact form ── */}
          <motion.div className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}>

            <div className="relative rounded-2xl p-6 md:p-8"
              style={{ background: "rgba(13,17,23,0.7)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.07)" }}>

              {/* Form glow accent */}
              <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
                style={{ background: "radial-gradient(circle at 100% 0%, rgba(124,58,237,0.08) 0%, transparent 70%)" }} />

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div key="success" className="flex flex-col items-center justify-center py-16 text-center"
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                    <motion.div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                      style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)" }}
                      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 400, damping: 20 }}>
                      <CheckCircle size={28} className="text-emerald-400" />
                    </motion.div>
                    <h3 className="font-display font-bold text-xl text-white mb-2">Message sent! 🎉</h3>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>I&apos;ll get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="space-y-5 relative z-10"
                    initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <InputField id="name" label="Your Name" value={formData.name}
                        error={errors.name} touched={touched.name}
                        onChange={handleChange} onBlur={handleBlur} inputRef={nameRef} />
                      <InputField id="email" label="Email Address" type="email" value={formData.email}
                        error={errors.email} touched={touched.email}
                        onChange={handleChange} onBlur={handleBlur} />
                    </div>

                    <InputField id="subject" label="Subject" value={formData.subject}
                      error={errors.subject} touched={touched.subject}
                      onChange={handleChange} onBlur={handleBlur} />

                    <InputField id="message" label="Message" value={formData.message}
                      error={errors.message} touched={touched.message}
                      onChange={handleChange} onBlur={handleBlur} rows={5} />

                    {/* Error banner */}
                    <AnimatePresence>
                      {status === "error" && (
                        <motion.div className="flex items-center gap-2 p-3 rounded-xl text-sm"
                          style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", color: "rgb(252,165,165)" }}
                          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                          <AlertCircle size={15} />
                          Something went wrong. Please try again or email me directly.
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex justify-end pt-2">
                      <button
                        ref={submitBtnRef}
                        type="submit"
                        disabled={status === "submitting"}
                        className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-medium text-sm text-white transition-all duration-300 disabled:opacity-60 hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]"
                        style={{ background: "linear-gradient(135deg, #7c3aed, #a78bfa)" }}
                        onMouseEnter={(e) => {
                          animate(e.currentTarget, {
                            scale: 1.05,
                            duration: 300,
                            easing: "outElastic(1, .5)",
                          });
                        }}
                        onMouseLeave={(e) => {
                          animate(e.currentTarget, {
                            scale: 1,
                            duration: 300,
                            easing: "outQuad",
                          });
                        }}
                      >
                        {status === "submitting" ? (
                          <>
                            <motion.div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                              animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
                            Sending...
                          </>
                        ) : (
                          <><Sparkles size={16} className="text-cyan-300" /><Send size={16} /> Send Message</>
                        )}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}