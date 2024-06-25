import { Box, Button, Typography } from "@mui/material";
import { useMemo } from "react";
import { Modal } from "src/components/common/modal";

export const TOC = ({ show, onClose }) => {
  const content = useMemo(() => {
    return `<div class="p-rich_text_section"><strong>Introduction<br /></strong><br />Welcome to&nbsp;<a class="c-link" href="http://prodbot.io/" target="_blank" rel="noopener noreferrer" data-stringify-link="http://Prodbot.io" data-sk="tooltip_parent">Prodbot.io</a>, a productivity tool designed to streamline business workflows by automating form-filling processes. By accessing or using our services, you agree to comply with and be bound by the following terms and conditions. If you do not agree with these terms, please do not use our services.<br />Use of Services<br /><a class="c-link" href="http://prodbot.io/" target="_blank" rel="noopener noreferrer" data-stringify-link="http://Prodbot.io" data-sk="tooltip_parent">Prodbot.io</a>&nbsp;provides tools for managing vendor interactions, handling document management, and tracking financial transactions associated with vendors. Our services include, but are not limited to, downloading existing W9 forms, uploading and storing Certificates of Insurance (COIs), and autofilling vendor start paperwork.<br />User Responsibilities</div>
<ul class="p-rich_text_list p-rich_text_list__bullet" data-stringify-type="unordered-list" data-indent="0" data-border="0">
<li data-stringify-indent="0" data-stringify-border="0">Users are responsible for verifying the accuracy and completeness of all information before transmitting or relying on it.</li>
<li data-stringify-indent="0" data-stringify-border="0">Users are responsible for maintaining the confidentiality of their login credentials and any activities that occur under their account.</li>
</ul>
<div class="p-rich_text_section"><em>Data Security and Privacy</em></div>
<ul class="p-rich_text_list p-rich_text_list__bullet" data-stringify-type="unordered-list" data-indent="0" data-border="0">
<li data-stringify-indent="0" data-stringify-border="0"><a class="c-link" href="http://prodbot.io/" target="_blank" rel="noopener noreferrer" data-stringify-link="http://Prodbot.io" data-sk="tooltip_parent">Prodbot.io</a>&nbsp;takes reasonable measures to protect sensitive data. However, we cannot guarantee the absolute security of your data.</li>
<li data-stringify-indent="0" data-stringify-border="0">By using our services, you acknowledge and agree that the transmission of sensitive data is at your own risk.</li>
<li data-stringify-indent="0" data-stringify-border="0">Users must comply with all applicable laws and regulations regarding data protection and privacy.</li>
</ul>
<div class="p-rich_text_section"><em>Disclaimer of Warranties</em></div>
<ul class="p-rich_text_list p-rich_text_list__bullet" data-stringify-type="unordered-list" data-indent="0" data-border="0">
<li data-stringify-indent="0" data-stringify-border="0"><a class="c-link" href="http://prodbot.io/" target="_blank" rel="noopener noreferrer" data-stringify-link="http://Prodbot.io" data-sk="tooltip_parent">Prodbot.io</a>&nbsp;is provided on an "as-is" and "as-available" basis. We make no representations or warranties of any kind, express or implied, regarding the operation of our services or the information, content, materials, or products included on the site.</li>
<li data-stringify-indent="0" data-stringify-border="0">We do not warrant that our services will be uninterrupted, timely, secure, or error-free.</li>
</ul>
<div class="p-rich_text_section"><em>Limitation of Liability</em></div>
<ul class="p-rich_text_list p-rich_text_list__bullet" data-stringify-type="unordered-list" data-indent="0" data-border="0">
<li data-stringify-indent="0" data-stringify-border="0">To the fullest extent permitted by law,&nbsp;<a class="c-link" href="http://prodbot.io/" target="_blank" rel="noopener noreferrer" data-stringify-link="http://Prodbot.io" data-sk="tooltip_parent">Prodbot.io</a>, its officers, directors, employees, and agents shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the services.</li>
<li data-stringify-indent="0" data-stringify-border="0"><a class="c-link" href="http://prodbot.io/" target="_blank" rel="noopener noreferrer" data-stringify-link="http://Prodbot.io" data-sk="tooltip_parent">Prodbot.io</a>&nbsp;shall not be liable for any errors or omissions in the content provided or for any loss or damage of any kind incurred as a result of the use of any content posted, transmitted, or otherwise made available via the services.</li>
</ul>
<div class="p-rich_text_section"><em>Indemnification</em></div>
<ul class="p-rich_text_list p-rich_text_list__bullet" data-stringify-type="unordered-list" data-indent="0" data-border="0">
<li data-stringify-indent="0" data-stringify-border="0">You agree to indemnify, defend, and hold harmless&nbsp;<a class="c-link" href="http://prodbot.io/" target="_blank" rel="noopener noreferrer" data-stringify-link="http://Prodbot.io" data-sk="tooltip_parent">Prodbot.io</a>, its officers, directors, employees, and agents from and against any and all claims, damages, obligations, losses, liabilities, costs, or debt, and expenses (including but not limited to attorney's fees) arising from your use of and access to the services, or your violation of these terms and conditions.</li>
</ul>
<div class="p-rich_text_section"><em>Changes to Terms and Conditions</em></div>
<ul class="p-rich_text_list p-rich_text_list__bullet" data-stringify-type="unordered-list" data-indent="0" data-border="0">
<li data-stringify-indent="0" data-stringify-border="0"><a class="c-link" href="http://prodbot.io/" target="_blank" rel="noopener noreferrer" data-stringify-link="http://Prodbot.io" data-sk="tooltip_parent">Prodbot.io</a>&nbsp;reserves the right to modify these terms and conditions at any time. Any changes will be effective immediately upon posting to the site. Your continued use of the services after any such changes constitutes your acceptance of the new terms and conditions.</li>
</ul>
<div class="p-rich_text_section"><em>Governing Law</em></div>
<ul class="p-rich_text_list p-rich_text_list__bullet" data-stringify-type="unordered-list" data-indent="0" data-border="0">
<li data-stringify-indent="0" data-stringify-border="0">These terms and conditions shall be governed by and construed in accordance with the laws of the jurisdiction in which&nbsp;<a class="c-link" href="http://prodbot.io/" target="_blank" rel="noopener noreferrer" data-stringify-link="http://Prodbot.io" data-sk="tooltip_parent">Prodbot.io</a>&nbsp;operates, without regard to its conflict of law principles.</li>
</ul>
<div class="p-rich_text_section"><strong>Contact Us</strong><br />If you have any questions or concerns about these terms and conditions, please contact us at&nbsp;<a class="c-link" href="mailto:support@prodbot.io" target="_blank" rel="noopener noreferrer" data-stringify-link="mailto:support@prodbot.io" data-sk="tooltip_parent" aria-haspopup="menu">support@prodbot.io</a>.</div>`;
  }, []);

  return (
    <Modal title="Terms & Conditions" open={show} onClose={onClose} size="md">
      <Typography variant="body1" dangerouslySetInnerHTML={{ __html: content }} />
      <Box
        sx={{
          mt: 2,
          gridColumn: "span 4",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button size="large" sx={{ mt: 3 }} onClick={onClose} variant="contained">
          Ok
        </Button>
      </Box>
    </Modal>
  );
};
