'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type DonationTrack = 'student' | 'yeshiva' | 'memorial';
type DonationForm = { amount: string; fullName: string; phone: string; email: string; memorialName: string };
type Errors = Partial<Record<keyof DonationForm, string>>;

const presets = ['100', '180', '360', '500'];
const API_VALID = '9bLzLFn7LA';
const MOSAD_ID = '7002290';
const NEDARIM_ORIGIN = 'https://www.matara.pro';

export default function DonatePage() {
  const locale = useLocale();
  const isHebrew = locale === 'he';
  const t = useTranslations('donatePage');
  const tracks = [
    { id: 'student' as const, label: t('tracks.student.label'), detail: t('tracks.student.detail'), defaultAmount: '560', cadence: t('monthly') },
    { id: 'yeshiva' as const, label: t('tracks.yeshiva.label'), detail: t('tracks.yeshiva.detail'), defaultAmount: '1000', cadence: t('monthly') },
    { id: 'memorial' as const, label: t('tracks.memorial.label'), detail: t('tracks.memorial.detail'), defaultAmount: '360', cadence: t('oneTime') },
  ];
  const [track, setTrack] = useState<DonationTrack>('student');
  const [form, setForm] = useState<DonationForm>({ amount: '560', fullName: '', phone: '', email: '', memorialName: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [checkoutUrl, setCheckoutUrl] = useState('');
  const [iframeHeight, setIframeHeight] = useState(690);
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const selectedTrack = tracks.find((item) => item.id === track) ?? tracks[0];

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== NEDARIM_ORIGIN) return;
      const payload = typeof event.data === 'string' ? event.data : JSON.stringify(event.data ?? {});
      const normalized = payload.toLowerCase();
      const heightMatch = payload.match(/(?:height|גובה)[^0-9]*(\d{3,4})/i);
      if (heightMatch) setIframeHeight(Math.max(520, Math.min(1200, Number(heightMatch[1]))));
      if (normalized.includes('success') || normalized.includes('approved') || normalized.includes('transactionok') || normalized.includes('עסקה בוצעה')) setIsThankYouOpen(true);
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const updateField = (field: keyof DonationForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const selectTrack = (nextTrack: DonationTrack) => {
    const next = tracks.find((item) => item.id === nextTrack) ?? tracks[0];
    setTrack(nextTrack);
    updateField('amount', next.defaultAmount);
    setCheckoutUrl('');
  };

  const validate = () => {
    const next: Errors = {};
    if (!Number.isFinite(Number(form.amount)) || Number(form.amount) < 1) next.amount = t('validation.amount');
    if (!form.fullName.trim()) next.fullName = t('validation.fullName');
    const normalizedPhone = form.phone.replace(/[\s()-]/g, '');
    const validPhone = isHebrew ? /^0\d{8,9}$/.test(normalizedPhone) : /^\+?\d{8,15}$/.test(normalizedPhone);
    if (!validPhone) next.phone = t('validation.phone');
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = t('validation.email');
    if (track === 'memorial' && !form.memorialName.trim()) next.memorialName = t('validation.memorialName');
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const buildCheckoutUrl = () => {
    const params = new URLSearchParams({
      mosad: MOSAD_ID,
      ApiValid: API_VALID,
      MosadId: MOSAD_ID,
      amount: form.amount,
      Amount: form.amount,
      subject: selectedTrack.label,
      Details: selectedTrack.label,
      frequency: selectedTrack.id === 'memorial' ? 'one-time' : 'monthly',
      fullName: form.fullName,
      phone: form.phone,
      email: form.email,
      note: form.memorialName,
    });
    return `${NEDARIM_ORIGIN}/nedarimplus/online/?${params.toString()}`;
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setCheckoutUrl(buildCheckoutUrl());
    window.setTimeout(() => iframeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
  };

  const sendData = () => {
    iframeRef.current?.contentWindow?.postMessage({
      type: 'nedarim-donation-data', ApiValid: API_VALID, MosadId: MOSAD_ID,
      amount: form.amount, track: selectedTrack.label,
      donor: { fullName: form.fullName, phone: form.phone, email: form.email }, memorialName: form.memorialName,
      frequency: selectedTrack.id === 'memorial' ? 'one-time' : 'monthly',
    }, NEDARIM_ORIGIN);
  };

  return (
    <div dir={isHebrew ? 'rtl' : 'ltr'} className="min-h-screen bg-[#f4f1e9] text-[#173850]">
      <Header overlay />
      <main>
        <section className="relative isolate overflow-hidden bg-[#071d31] px-4 pb-16 pt-36 text-white sm:px-8 lg:min-h-[620px] lg:px-16 lg:pb-24 lg:pt-48">
          <Image src="/images/building.jpg" alt={t('schoolName')} fill priority className="-z-20 object-cover object-center opacity-60" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(7,29,49,.9),rgba(7,29,49,.46),rgba(7,29,49,.8))]" />
          <div className="relative mx-auto max-w-7xl">
            <p className="mb-5 text-sm font-bold tracking-[.22em] text-[#eee86d]">{t('schoolName')}</p>
            <h1 className="max-w-4xl font-serif text-5xl font-bold leading-[.98] text-white sm:text-7xl lg:text-8xl">{t('heroTitle')}</h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/80 sm:text-xl">{t('heroDescription')}</p>
            <a href="#donation-form" className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#eee86d] px-7 py-4 font-bold text-[#173850] shadow-xl transition hover:-translate-y-1 hover:bg-white">{t('heroCta')} <span aria-hidden="true">↓</span></a>
          </div>
        </section>

        <section id="donation-form" className="px-4 py-12 sm:px-8 lg:px-16 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.8fr_1.2fr]">
            <aside className="relative overflow-hidden rounded-[2rem] bg-[#173850] p-8 text-white shadow-2xl lg:p-10">
              <div className="absolute -start-20 -top-20 h-56 w-56 rounded-full border border-[#eee86d]/30" />
              <p className="relative text-sm font-bold tracking-[.18em] text-[#eee86d]">{t('impactEyebrow')}</p>
              <h2 className="relative mt-5 font-serif text-4xl font-bold leading-tight text-white">{t('impactTitle')}</h2>
              <p className="relative mt-6 leading-8 text-white/75">{t('impactDescription')}</p>
              <div className="relative mt-10 grid gap-4 border-t border-white/15 pt-6 text-sm text-white/70"><span>✓ {t('benefits.students')}</span><span>✓ {t('benefits.beitMidrash')}</span><span>✓ {t('benefits.securePayment')}</span></div>
            </aside>

            <form onSubmit={submit} className="rounded-[2rem] border border-[#d9d3c6] bg-white p-5 shadow-xl sm:p-8 lg:p-10">
              <p className="text-sm font-bold tracking-[.16em] text-[#a4762f]">{t('formEyebrow')}</p>
              <h2 className="mt-2 font-serif text-4xl font-bold text-[#173850]">{t('formTitle')}</h2>
              <div className="mt-8 grid gap-3 md:grid-cols-3" role="tablist" aria-label={t('tracksAria')}>
                {tracks.map((item) => <button key={item.id} type="button" role="tab" aria-selected={track === item.id} onClick={() => selectTrack(item.id)} className={`min-h-32 rounded-2xl border p-4 text-start transition ${track === item.id ? 'border-[#173850] bg-[#173850] text-white shadow-lg' : 'border-[#d9d3c6] bg-[#faf8f3] text-[#173850] hover:border-[#a4762f]'}`}><span className="block font-bold">{item.label}</span><span className={`mt-2 block text-xs leading-5 ${track === item.id ? 'text-white/70' : 'text-[#697780]'}`}>{item.detail}</span><strong className={`mt-3 block text-lg ${track === item.id ? 'text-[#eee86d]' : 'text-[#a4762f]'}`}>₪{item.defaultAmount} <small className="text-xs font-normal">{item.cadence}</small></strong></button>)}
              </div>

              <div className="mt-8"><div className="mb-3 flex items-center justify-between gap-3"><label className="block font-bold" htmlFor="donation-amount">{t('amount')}</label><span className="text-sm font-bold text-[#a4762f]">{selectedTrack.cadence}</span></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{presets.map((preset) => <button key={preset} type="button" onClick={() => updateField('amount', preset)} className={`rounded-xl border py-3 font-bold transition ${form.amount === preset ? 'border-[#a4762f] bg-[#eee86d] text-[#173850]' : 'border-[#d9d3c6] bg-[#faf8f3] hover:border-[#a4762f]'}`}>₪{preset}</button>)}</div><div className="relative mt-3"><span className="pointer-events-none absolute inset-y-0 start-4 flex items-center text-[#697780]">₪</span><input id="donation-amount" inputMode="decimal" value={form.amount} onChange={(event) => updateField('amount', event.target.value.replace(/[^0-9]/g, ''))} className="w-full rounded-xl border border-[#d9d3c6] bg-[#faf8f3] py-3 ps-9 pe-4 outline-none transition focus:border-[#173850] focus:ring-2 focus:ring-[#eee86d]" placeholder={t('amountPlaceholder', { amount: selectedTrack.defaultAmount })} /></div>{errors.amount && <p className="mt-2 text-sm text-red-700">{errors.amount}</p>}</div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2"><Field label={t('fullName')} value={form.fullName} error={errors.fullName} onChange={(value) => updateField('fullName', value)} placeholder={t('fullNamePlaceholder')} /><Field label={t('phone')} value={form.phone} error={errors.phone} onChange={(value) => updateField('phone', value)} placeholder={t('phonePlaceholder')} type="tel" /><Field label={t('email')} value={form.email} error={errors.email} onChange={(value) => updateField('email', value)} placeholder={t('emailPlaceholder')} type="email" />{track === 'memorial' && <Field label={t('memorialName')} value={form.memorialName} error={errors.memorialName} onChange={(value) => updateField('memorialName', value)} placeholder={t('memorialPlaceholder')} />}</div>
              <button type="submit" className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-[#173850] px-6 py-4 text-lg font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#0d2a41]">{t('submit')} <span aria-hidden="true">{isHebrew ? '←' : '→'}</span></button>
              <p className="mt-3 text-center text-xs text-[#697780]">{t('paymentNote')}</p>
            </form>
          </div>
        </section>

        {checkoutUrl && <section className="bg-[#173850] px-4 py-12 sm:px-8 lg:px-16 lg:py-20" aria-labelledby="checkout-title"><div className="mx-auto max-w-5xl rounded-[2rem] bg-white p-4 shadow-2xl sm:p-6"><div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><p className="text-sm font-bold text-[#a4762f]">{selectedTrack.label}</p><h2 id="checkout-title" className="font-serif text-3xl font-bold text-[#173850]">{t('checkoutTitle')}</h2></div><strong className="rounded-full bg-[#eee86d] px-4 py-2 text-[#173850]">₪{form.amount}</strong></div><iframe ref={iframeRef} title={t('iframeTitle')} src={checkoutUrl} onLoad={sendData} style={{ height: iframeHeight }} className="w-full rounded-xl border border-[#d9d3c6]" /></div></section>}
      </main>
      {isThankYouOpen && <div className="fixed inset-0 z-[100] grid place-items-center bg-[#071d31]/80 p-4 backdrop-blur-sm"><div role="dialog" aria-modal="true" aria-labelledby="thank-you-title" className="w-full max-w-md rounded-[2rem] bg-white p-8 text-center shadow-2xl"><div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#eee86d] text-3xl text-[#173850]">✓</div><h2 id="thank-you-title" className="mt-5 font-serif text-4xl font-bold text-[#173850]">{t('thankYouTitle')}</h2><p className="mt-4 leading-8 text-[#697780]">{t('thankYouDescription')}</p><button type="button" onClick={() => setIsThankYouOpen(false)} className="mt-7 rounded-full bg-[#173850] px-7 py-3 font-bold text-white">{t('close')}</button></div></div>}
      <Footer />
    </div>
  );
}

function Field({ label, value, error, onChange, placeholder, type = 'text' }: { label: string; value: string; error?: string; onChange: (value: string) => void; placeholder: string; type?: string }) {
  return <label className="block"><span className="mb-2 block font-bold text-[#173850]">{label}</span><input type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} className="w-full rounded-xl border border-[#d9d3c6] bg-[#faf8f3] px-4 py-3 outline-none transition placeholder:text-[#9a9b98] focus:border-[#173850] focus:ring-2 focus:ring-[#eee86d]" />{error && <span className="mt-1 block text-sm text-red-700">{error}</span>}</label>;
}
