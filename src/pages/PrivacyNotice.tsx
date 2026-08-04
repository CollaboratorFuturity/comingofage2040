import { Link } from "react-router-dom";

const Th = ({ children }: { children: React.ReactNode }) => (
  <th className="text-left align-top border border-border/40 px-3 py-2 font-normal bg-foreground/5">{children}</th>
);

const Td = ({ children }: { children: React.ReactNode }) => (
  <td className="text-left align-top border border-border/40 px-3 py-2">{children}</td>
);

const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target={href.startsWith("mailto:") ? undefined : "_blank"}
    rel="noopener noreferrer"
    className="underline hover:text-primary transition-colors"
  >
    {children}
  </a>
);

const PrivacyNotice = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Link
        to="/#main"
        className="fixed top-4 left-6 z-50 px-4 py-2 border border-foreground/30 text-foreground hover:bg-foreground hover:text-background transition-all duration-300 text-xs tracking-widest inline-block"
      >
        Back to Main
      </Link>

      <main className="max-w-3xl mx-auto px-6 pt-24 pb-24 font-thin text-sm leading-relaxed normal-case">
        <h1 className="text-3xl font-normal mb-2">Privacy Notice</h1>
        <p className="text-xs text-muted-foreground mb-10">Last updated: 4 August 2026</p>

        <p className="mb-4">
          This privacy notice explains how your personal data is collected and processed when you use the voice agents
          on futuresGarden. Please read it before starting a voice interaction.
        </p>

        <h2 className="text-lg font-normal mt-9 mb-3 pb-1.5 border-b border-border/40">1. Who We Are</h2>
        <p className="mb-4">The data controller for futuresGarden is:</p>
        <div className="border border-border/40 rounded-md px-5 py-4 my-4 space-y-1">
          <p>
            <strong className="font-normal">Marsbound SL</strong>, trading as Futurity Systems
          </p>
          <p>CIF: ESB67662171</p>
          <p>Calle Bailen 11, Bajos, 08010 Barcelona, Spain</p>
          <p>
            Contact: <A href="mailto:lynch@futurity.systems">lynch@futurity.systems</A>
          </p>
          <p>Phone: +34 673 977 772</p>
        </div>

        <h2 className="text-lg font-normal mt-9 mb-3 pb-1.5 border-b border-border/40">2. What Data We Collect</h2>
        <p className="mb-4">When you use a voice agent on this page, the following data is processed:</p>
        <table className="w-full border-collapse my-4">
          <tbody>
            <tr>
              <Th>Data category</Th>
              <Th>Description</Th>
            </tr>
            <tr>
              <Td>Voice audio</Td>
              <Td>
                Your voice is captured by your device microphone and streamed in real time to our voice-AI processor
                (see Section 4) for the duration of the conversation. We do not store voice recordings on our own
                servers.
              </Td>
            </tr>
            <tr>
              <Td>Technical metadata</Td>
              <Td>
                Standard web-server logs (IP address, browser type, timestamp). These are retained for up to 30 days for
                security and troubleshooting purposes, then deleted.
              </Td>
            </tr>
          </tbody>
        </table>
        <p className="mb-4">
          We do not require you to create an account, and we do not collect your name, email address, or any other
          identifying information unless you voluntarily include it in what you say during a conversation.
        </p>

        <h2 className="text-lg font-normal mt-9 mb-3 pb-1.5 border-b border-border/40">
          3. Why We Process Your Data and Our Legal Basis
        </h2>
        <table className="w-full border-collapse my-4">
          <tbody>
            <tr>
              <Th>Purpose</Th>
              <Th>Legal basis (GDPR)</Th>
            </tr>
            <tr>
              <Td>Providing the voice-agent interaction you requested</Td>
              <Td>
                <strong className="font-normal">Consent</strong> — Art. 6(1)(a). You give consent by clicking "Start"
                before the voice interaction begins. You can withdraw consent at any time by closing the conversation.
              </Td>
            </tr>
            <tr>
              <Td>Processing voice audio as potential biometric data</Td>
              <Td>
                <strong className="font-normal">Explicit consent</strong> — Art. 9(2)(a). Voice data processed through
                AI speech technology may constitute biometric data under GDPR Art. 4(14). Your explicit consent is
                obtained before any voice processing begins.
              </Td>
            </tr>
            <tr>
              <Td>Security and abuse prevention</Td>
              <Td>
                <strong className="font-normal">Legitimate interest</strong> — Art. 6(1)(f). Maintaining server logs to
                protect the service from abuse. Our legitimate interest does not override your rights given the minimal
                data involved and short retention period.
              </Td>
            </tr>
          </tbody>
        </table>

        <h2 className="text-lg font-normal mt-9 mb-3 pb-1.5 border-b border-border/40">4. Who Receives Your Data</h2>
        <p className="mb-4">Your voice audio is processed by:</p>
        <table className="w-full border-collapse my-4">
          <tbody>
            <tr>
              <Th>Recipient</Th>
              <Th>Role</Th>
              <Th>Location</Th>
              <Th>Safeguards</Th>
            </tr>
            <tr>
              <Td>
                <strong className="font-normal">ElevenLabs, Inc.</strong>
              </Td>
              <Td>Data processor (voice AI)</Td>
              <Td>United States</Td>
              <Td>
                Data Processing Addendum with Standard Contractual Clauses (EU Commission Decision 2021/914); EU-US Data
                Privacy Framework certification
              </Td>
            </tr>
          </tbody>
        </table>
        <p className="mb-4">
          ElevenLabs processes your voice audio solely to generate the AI agent's spoken responses. ElevenLabs' own
          sub-processors are listed at <A href="https://compliance.elevenlabs.io">compliance.elevenlabs.io</A>. Their
          Data Processing Addendum is available at <A href="https://elevenlabs.io/dpa">elevenlabs.io/dpa</A>.
        </p>
        <p className="mb-4">We do not sell, share, or otherwise disclose your data to any other third party.</p>

        <h2 className="text-lg font-normal mt-9 mb-3 pb-1.5 border-b border-border/40">
          5. International Data Transfers
        </h2>
        <p className="mb-4">
          Your voice audio is transferred to the United States for processing by ElevenLabs. This transfer is protected
          by:
        </p>
        <ul className="list-disc ml-6 mb-4 space-y-1.5">
          <li>
            <strong className="font-normal">Standard Contractual Clauses (SCCs)</strong> — Module 2
            (controller-to-processor), as incorporated in the ElevenLabs DPA, governed by the law of Ireland.
          </li>
          <li>
            <strong className="font-normal">EU-US Data Privacy Framework</strong> — ElevenLabs' certification under the
            adequacy decision of 10 July 2023.
          </li>
        </ul>
        <p className="mb-4">
          We have conducted a Transfer Impact Assessment to evaluate whether these safeguards provide adequate
          protection in practice. A copy is available on request.
        </p>

        <h2 className="text-lg font-normal mt-9 mb-3 pb-1.5 border-b border-border/40">6. How Long We Keep Your Data</h2>
        <table className="w-full border-collapse my-4">
          <tbody>
            <tr>
              <Th>Data</Th>
              <Th>Retention</Th>
            </tr>
            <tr>
              <Td>Voice audio (on our servers)</Td>
              <Td>Not stored. Streamed in real time and discarded after the session ends.</Td>
            </tr>
            <tr>
              <Td>Voice audio (at ElevenLabs)</Td>
              <Td>
                Subject to ElevenLabs' retention policy. ElevenLabs may retain content for up to 30 days of inactivity,
                after which it will be deleted. See their <A href="https://elevenlabs.io/dpa">DPA Section 9</A> for
                details.
              </Td>
            </tr>
            <tr>
              <Td>Server logs (IP, browser, timestamp)</Td>
              <Td>30 days, then permanently deleted.</Td>
            </tr>
          </tbody>
        </table>

        <h2 className="text-lg font-normal mt-9 mb-3 pb-1.5 border-b border-border/40">7. Your Rights</h2>
        <p className="mb-4">Under the GDPR, you have the following rights in relation to your personal data:</p>
        <ul className="list-disc ml-6 mb-4 space-y-1.5">
          <li>
            <strong className="font-normal">Access</strong> (Art. 15) — request a copy of the data we hold about you.
          </li>
          <li>
            <strong className="font-normal">Rectification</strong> (Art. 16) — ask us to correct inaccurate data.
          </li>
          <li>
            <strong className="font-normal">Erasure</strong> (Art. 17) — ask us to delete your data ("right to be
            forgotten").
          </li>
          <li>
            <strong className="font-normal">Restriction</strong> (Art. 18) — ask us to limit how we use your data.
          </li>
          <li>
            <strong className="font-normal">Portability</strong> (Art. 20) — receive your data in a machine-readable
            format.
          </li>
          <li>
            <strong className="font-normal">Object</strong> (Art. 21) — object to processing based on legitimate
            interest.
          </li>
          <li>
            <strong className="font-normal">Withdraw consent</strong> (Art. 7) — withdraw your consent at any time,
            without affecting the lawfulness of processing before withdrawal.
          </li>
        </ul>
        <p className="mb-4">
          Because this service is anonymous, we may not be able to identify your data without additional information
          from you (Art. 11 GDPR). If you wish to exercise any of these rights, please contact us at{" "}
          <A href="mailto:lynch@futurity.systems">lynch@futurity.systems</A> with as much detail as possible (e.g.,
          approximate date and time of your session).
        </p>
        <p className="mb-4">We will respond to your request within 30 days.</p>

        <h2 className="text-lg font-normal mt-9 mb-3 pb-1.5 border-b border-border/40">8. Security</h2>
        <p className="mb-4">
          Voice audio is transmitted over encrypted connections (HTTPS/TLS). Access to server logs is restricted to
          authorised personnel. We review our security measures regularly and update them as needed.
        </p>

        <h2 className="text-lg font-normal mt-9 mb-3 pb-1.5 border-b border-border/40">9. Breach Notification</h2>
        <p className="mb-4">
          If a data breach occurs that is likely to result in a high risk to your rights and freedoms, we will notify
          affected individuals without undue delay, in accordance with GDPR Art. 34. Because this service is anonymous,
          notification may be published on this page if we cannot contact you directly.
        </p>

        <h2 className="text-lg font-normal mt-9 mb-3 pb-1.5 border-b border-border/40">10. Automated Decision-Making</h2>
        <p className="mb-4">
          The voice agents use artificial intelligence to generate spoken responses to your input. This processing does
          not produce legal or similarly significant effects on you. No automated decisions are made about you as
          defined by Art. 22 GDPR.
        </p>

        <h2 className="text-lg font-normal mt-9 mb-3 pb-1.5 border-b border-border/40">11. Children</h2>
        <p className="mb-4">
          This service is not directed at children under 16. If you are under 16, please do not use the voice agents
          without parental or guardian consent.
        </p>

        <h2 className="text-lg font-normal mt-9 mb-3 pb-1.5 border-b border-border/40">12. Supervisory Authority</h2>
        <p className="mb-4">
          You have the right to lodge a complaint with a data protection supervisory authority. As our establishment is
          in Spain, the lead authority is:
        </p>
        <div className="border border-border/40 rounded-md px-5 py-4 my-4 space-y-1">
          <p>
            <strong className="font-normal">Agencia Española de Protección de Datos (AEPD)</strong>
          </p>
          <p>
            <A href="https://www.aepd.es">www.aepd.es</A>
          </p>
          <p>C/ Jorge Juan, 6, 28001 Madrid, Spain</p>
        </div>
        <p className="mb-4">You may also complain to the supervisory authority in your country of residence.</p>

        <h2 className="text-lg font-normal mt-9 mb-3 pb-1.5 border-b border-border/40">13. Changes to This Notice</h2>
        <p className="mb-4">
          We may update this notice from time to time. The "Last updated" date at the top will reflect the most recent
          revision. Material changes will be communicated via a notice on the futuresGarden page.
        </p>

        <div className="mt-12 pt-4 border-t border-border/40 text-xs text-muted-foreground">
          <p>© 2026 Marsbound SL, trading as Futurity Systems. All rights reserved.</p>
        </div>
      </main>
    </div>
  );
};

export default PrivacyNotice;
