import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:url_launcher/url_launcher.dart';

// ─── Colour palette ──────────────────────────────────────────────────────────
const _bgPrimary    = Color(0xFF0A0F1E);
const _bgSecondary  = Color(0xFF0D1530);
const _bgCard       = Color(0xFF111827);
const _border       = Color(0xFF1E2D4A);
const _blue         = Color(0xFF3B82F6);
const _cyan         = Color(0xFF06B6D4);
const _green        = Color(0xFF10B981);
const _orange       = Color(0xFFF59E0B);
const _red          = Color(0xFFEF4444);
const _purple       = Color(0xFF8B5CF6);
const _textPrimary  = Color(0xFFF1F5F9);
const _textSecondary= Color(0xFF94A3B8);
const _textMuted    = Color(0xFF475569);

// ─── Home Page ───────────────────────────────────────────────────────────────
class HomePage extends StatefulWidget {
  const HomePage({super.key});
  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final _scrollController = ScrollController();

  @override
  void dispose() {
    _scrollController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: _bgPrimary,
      body: Stack(
        children: [
          SingleChildScrollView(
            controller: _scrollController,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: const [
                SizedBox(height: 64),
                _HeroSection(),
                _StatsBar(),
                _FeaturesSection(),
                _DemoSection(),
                _ModulesSection(),
                _TechStackSection(),
                _CTASection(),
                _Footer(),
              ],
            ),
          ),
          _Navbar(scrollController: _scrollController),
        ],
      ),
    );
  }
}

// ─── Navbar ──────────────────────────────────────────────────────────────────
class _Navbar extends StatelessWidget {
  final ScrollController scrollController;
  const _Navbar({required this.scrollController});

  @override
  Widget build(BuildContext context) {
    final isMobile = MediaQuery.of(context).size.width < 768;
    return Positioned(
      top: 0, left: 0, right: 0,
      child: Container(
        height: 64,
        decoration: BoxDecoration(
          color: _bgPrimary.withAlpha(235),
          border: const Border(bottom: BorderSide(color: _border)),
        ),
        padding: const EdgeInsets.symmetric(horizontal: 24),
        child: Row(
          children: [
            const _Logo(),
            const Spacer(),
            if (!isMobile) ...[
              const _NavLink('Features'),
              const _NavLink('Modules'),
              const _NavLink('Demo'),
              const _NavLink('Stack'),
              const SizedBox(width: 16),
              _OutlineBtn('See Demo', onTap: () {}),
              const SizedBox(width: 8),
              _PrimaryBtn('Get Started', onTap: () {}),
            ],
          ],
        ),
      ),
    );
  }
}

class _Logo extends StatelessWidget {
  const _Logo();
  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        const Text('⛨', style: TextStyle(fontSize: 22, color: _blue)),
        const SizedBox(width: 8),
        RichText(
          text: TextSpan(
            style: GoogleFonts.inter(fontSize: 15, fontWeight: FontWeight.w700),
            children: const [
              TextSpan(text: 'Cloud',    style: TextStyle(color: _textPrimary)),
              TextSpan(text: 'Guardian', style: TextStyle(color: _blue)),
              TextSpan(text: ' AI',      style: TextStyle(color: _textPrimary)),
            ],
          ),
        ),
      ],
    );
  }
}

class _NavLink extends StatelessWidget {
  final String label;
  const _NavLink(this.label);
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 12),
      child: Text(label,
          style: GoogleFonts.inter(
              fontSize: 14, fontWeight: FontWeight.w500, color: _textSecondary)),
    );
  }
}

class _PrimaryBtn extends StatelessWidget {
  final String label;
  final VoidCallback onTap;
  const _PrimaryBtn(this.label, {required this.onTap});
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        decoration: BoxDecoration(
          color: _blue,
          borderRadius: BorderRadius.circular(7),
        ),
        child: Text(label,
            style: GoogleFonts.inter(
                fontSize: 13, fontWeight: FontWeight.w600, color: Colors.white)),
      ),
    );
  }
}

class _OutlineBtn extends StatelessWidget {
  final String label;
  final VoidCallback onTap;
  const _OutlineBtn(this.label, {required this.onTap});
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        decoration: BoxDecoration(
          border: Border.all(color: _border),
          borderRadius: BorderRadius.circular(7),
        ),
        child: Text(label,
            style: GoogleFonts.inter(
                fontSize: 13, fontWeight: FontWeight.w500, color: _textSecondary)),
      ),
    );
  }
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
class _HeroSection extends StatelessWidget {
  const _HeroSection();

  @override
  Widget build(BuildContext context) {
    final w = MediaQuery.of(context).size.width;
    return Container(
      constraints: const BoxConstraints(minHeight: 600),
      padding: EdgeInsets.symmetric(horizontal: w < 600 ? 20 : 40, vertical: 72),
      decoration: const BoxDecoration(
        gradient: RadialGradient(
          center: Alignment(0, -0.4),
          radius: 1.2,
          colors: [Color(0xFF0D1B3E), _bgPrimary],
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          // Badge
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
            decoration: BoxDecoration(
              color: _blue.withAlpha(26),
              border: Border.all(color: _border),
              borderRadius: BorderRadius.circular(100),
            ),
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                const _PulseDot(),
                const SizedBox(width: 8),
                Text('AI-Powered Cloud Operations',
                    style: GoogleFonts.inter(
                        fontSize: 12,
                        fontWeight: FontWeight.w500,
                        color: Color(0xFF60A5FA))),
              ],
            ),
          ).animate().fadeIn(duration: 500.ms).slideY(begin: -0.2),

          const SizedBox(height: 28),

          // Heading
          RichText(
            textAlign: TextAlign.center,
            text: TextSpan(
              style: GoogleFonts.inter(
                  fontSize: w < 600 ? 30 : 46,
                  fontWeight: FontWeight.w800,
                  height: 1.15,
                  letterSpacing: -0.5),
              children: [
                const TextSpan(
                    text: 'Your Cloud Infrastructure,\n',
                    style: TextStyle(color: _textPrimary)),
                TextSpan(
                    text: 'Intelligently Managed',
                    style: TextStyle(
                        foreground: Paint()
                          ..shader = const LinearGradient(
                            colors: [_blue, _cyan],
                          ).createShader(const Rect.fromLTWH(0, 0, 400, 60)))),
              ],
            ),
          ).animate().fadeIn(delay: 100.ms, duration: 600.ms).slideY(begin: 0.1),

          const SizedBox(height: 20),

          // Subheading
          ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 560),
            child: Text(
              'CloudGuardian AI acts as your always-on cloud advisor — reducing costs, '
              'diagnosing incidents, and notifying your team before small problems become outages.',
              textAlign: TextAlign.center,
              style: GoogleFonts.inter(
                  fontSize: 15, color: _textSecondary, height: 1.7),
            ),
          ).animate().fadeIn(delay: 200.ms, duration: 600.ms),

          const SizedBox(height: 32),

          // CTA buttons
          Wrap(
            spacing: 12,
            runSpacing: 12,
            alignment: WrapAlignment.center,
            children: [
              _PrimaryBtn('View Live Demo  →', onTap: () {}),
              _OutlineBtn('Explore Modules', onTap: () {}),
            ],
          ).animate().fadeIn(delay: 300.ms, duration: 600.ms),

          const SizedBox(height: 48),

          // Terminal card
          ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 620),
            child: const _TerminalCard(),
          ).animate().fadeIn(delay: 400.ms, duration: 700.ms).slideY(begin: 0.1),
        ],
      ),
    );
  }
}

// ─── Pulse dot animation ──────────────────────────────────────────────────────
class _PulseDot extends StatefulWidget {
  const _PulseDot();
  @override
  State<_PulseDot> createState() => _PulseDotState();
}

class _PulseDotState extends State<_PulseDot>
    with SingleTickerProviderStateMixin {
  late AnimationController _ctrl;
  late Animation<double> _anim;

  @override
  void initState() {
    super.initState();
    _ctrl = AnimationController(
        vsync: this, duration: const Duration(seconds: 2))
      ..repeat(reverse: true);
    _anim = Tween<double>(begin: 1.0, end: 0.3).animate(_ctrl);
  }

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return AnimatedBuilder(
      animation: _anim,
      builder: (_, __) => Opacity(
        opacity: _anim.value,
        child: Container(
          width: 7,
          height: 7,
          decoration: BoxDecoration(
            color: _green,
            shape: BoxShape.circle,
            boxShadow: [
              BoxShadow(color: _green.withAlpha(153), blurRadius: 6)
            ],
          ),
        ),
      ),
    );
  }
}

// ─── Terminal card ────────────────────────────────────────────────────────────
class _TerminalCard extends StatelessWidget {
  const _TerminalCard();

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: const Color(0xFF0D1117),
        border: Border.all(color: _border),
        borderRadius: BorderRadius.circular(10),
        boxShadow: [
          BoxShadow(
              color: Colors.black.withAlpha(128),
              blurRadius: 40,
              offset: const Offset(0, 20))
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Title bar
          Container(
            padding:
                const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
            decoration: const BoxDecoration(
              color: Color(0xFF161B22),
              borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(10),
                  topRight: Radius.circular(10)),
              border: Border(bottom: BorderSide(color: _border)),
            ),
            child: Row(
              children: [
                _dot(const Color(0xFFEF4444)),
                const SizedBox(width: 6),
                _dot(const Color(0xFFF59E0B)),
                const SizedBox(width: 6),
                _dot(const Color(0xFF10B981)),
                const SizedBox(width: 12),
                Text('cloudguardian — ai-analyst',
                    style:
                        GoogleFonts.firaCode(fontSize: 12, color: _textMuted)),
              ],
            ),
          ),
          // Body
          Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: const [
                _TerminalLine(
                    icon: '✓',
                    iconColor: _green,
                    text: 'Log stream connected — 1,247 events parsed'),
                _TerminalLine(
                    icon: '✗',
                    iconColor: _red,
                    text: 'ERROR: Database Connection Failed detected'),
                _TerminalLine(
                    icon: '→',
                    iconColor: _orange,
                    text: 'Root Cause: Expired Database Credentials',
                    highlight: true),
                _TerminalLine(
                    icon: '→',
                    iconColor: _orange,
                    text: 'Severity: Critical / Priority: High'),
                _TerminalLine(
                    icon: '⚡',
                    iconColor: _blue,
                    text:
                        'Recovery: Rotate credentials → Restart db service'),
                _TerminalLine(
                    icon: '✓',
                    iconColor: _green,
                    text:
                        'Notifications dispatched — Email, Slack, Teams'),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _dot(Color c) => Container(
      width: 10,
      height: 10,
      decoration:
          BoxDecoration(color: c.withAlpha(204), shape: BoxShape.circle));
}

class _TerminalLine extends StatelessWidget {
  final String icon;
  final Color iconColor;
  final String text;
  final bool highlight;
  const _TerminalLine(
      {required this.icon,
      required this.iconColor,
      required this.text,
      this.highlight = false});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(icon,
              style: TextStyle(
                  color: iconColor, fontSize: 13, fontFamily: 'monospace')),
          const SizedBox(width: 10),
          Expanded(
            child: Text(text,
                style: GoogleFonts.firaCode(
                    fontSize: 12,
                    color: highlight ? _textPrimary : _textSecondary,
                    height: 1.5)),
          ),
        ],
      ),
    );
  }
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────
class _StatsBar extends StatelessWidget {
  const _StatsBar();

  @override
  Widget build(BuildContext context) {
    final w = MediaQuery.of(context).size.width;
    const stats = [
      ('\$4,200', 'Monthly savings identified', _green),
      ('<2 min',  'Avg. incident detection',    _blue),
      ('3',       'Notification channels',       _purple),
      ('4',       'AI-powered modules',          _orange),
    ];
    return Container(
      padding: const EdgeInsets.symmetric(vertical: 28, horizontal: 24),
      decoration: const BoxDecoration(
        color: _bgSecondary,
        border:
            Border.symmetric(horizontal: BorderSide(color: _border)),
      ),
      child: Wrap(
        alignment: WrapAlignment.spaceEvenly,
        runSpacing: 20,
        spacing: 24,
        children: stats
            .map((s) => SizedBox(
                  width: w < 500 ? (w / 2) - 28 : 160,
                  child: Column(
                    children: [
                      Text(s.$1,
                          style: GoogleFonts.inter(
                              fontSize: 28,
                              fontWeight: FontWeight.w800,
                              color: s.$3)),
                      const SizedBox(height: 4),
                      Text(s.$2,
                          textAlign: TextAlign.center,
                          style: GoogleFonts.inter(
                              fontSize: 12, color: _textMuted)),
                    ],
                  ),
                ))
            .toList(),
      ),
    );
  }
}

// ─── Features ─────────────────────────────────────────────────────────────────
class _FeaturesSection extends StatelessWidget {
  const _FeaturesSection();

  @override
  Widget build(BuildContext context) {
    const features = [
      (
        '💰',
        'Cost Prediction',
        'Forecast next month\'s bill before the invoice arrives. Catch spending anomalies early with AI-driven usage trend analysis.',
        _green
      ),
      (
        '📊',
        'Cost Explanation',
        'Plain-language breakdowns: "Costs increased 37% due to traffic surges and additional compute scaling."',
        _blue
      ),
      (
        '💡',
        'Savings Recommendations',
        'Actionable tasks — remove idle servers, switch to spot instances, right-size databases — with exact savings estimates.',
        _orange
      ),
      (
        '🔍',
        'Log Analysis',
        'Feed in raw unstructured logs. The AI parses thousands of events per second and flags critical errors instantly.',
        _purple
      ),
      (
        '🎯',
        'Root Cause Detection',
        'No more guessing. CloudGuardian pinpoints exactly why something failed — from expired credentials to misconfigured routes.',
        _red
      ),
      (
        '🔔',
        'Multi-Channel Alerts',
        'Structured alerts delivered simultaneously to Email, Slack, and Microsoft Teams — rich templates, zero setup friction.',
        _cyan
      ),
    ];

    return Container(
      padding:
          const EdgeInsets.symmetric(vertical: 80, horizontal: 24),
      color: _bgPrimary,
      child: Column(
        children: [
          const _SectionHeader(
            eyebrow: 'Capabilities',
            title: 'Everything your cloud team needs',
            sub:
                'Six core capabilities working together to give you full operational visibility.',
            eyebrowColor: _blue,
          ),
          const SizedBox(height: 48),
          _ResponsiveGrid(
            children: features
                .map((f) => _FeatureCard(
                    icon: f.$1,
                    title: f.$2,
                    desc: f.$3,
                    accent: f.$4))
                .toList(),
          ),
        ],
      ),
    );
  }
}

class _FeatureCard extends StatelessWidget {
  final String icon, title, desc;
  final Color accent;
  const _FeatureCard(
      {required this.icon,
      required this.title,
      required this.desc,
      required this.accent});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: _bgCard,
        border: Border.all(color: _border),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 44,
            height: 44,
            decoration: BoxDecoration(
              color: accent.withAlpha(26),
              border: Border.all(color: accent.withAlpha(51)),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Center(
                child: Text(icon,
                    style: const TextStyle(fontSize: 20))),
          ),
          const SizedBox(height: 14),
          Text(title,
              style: GoogleFonts.inter(
                  fontSize: 15,
                  fontWeight: FontWeight.w700,
                  color: _textPrimary)),
          const SizedBox(height: 8),
          Text(desc,
              style: GoogleFonts.inter(
                  fontSize: 13,
                  color: _textSecondary,
                  height: 1.65)),
        ],
      ),
    ).animate().fadeIn(duration: 500.ms).slideY(begin: 0.1);
  }
}

// ─── Demo Scenarios ───────────────────────────────────────────────────────────
class _DemoSection extends StatefulWidget {
  const _DemoSection();
  @override
  State<_DemoSection> createState() => _DemoSectionState();
}

class _DemoSectionState extends State<_DemoSection> {
  int _active = 0;

  // Each scenario: (label, badge, badgeColor, title, desc, steps)
  // steps: list of (icon, label, detail)
  static final _scenarios = [
    _Scenario(
      label: 'Traffic Spike',
      badge: 'Cost Event',
      badgeColor: _green,
      title: 'Infrastructure Traffic Spike',
      desc:
          'Concurrent user traffic spikes by 500%, triggering rapid compute scaling and database expansion.',
      steps: const [
        _Step('📈', 'Detection',
            'AI Cloud CFO detects 500% traffic growth and abnormal resource provisioning'),
        _Step('💸', 'Forecast',
            'Predicted Monthly Bill: \$18,500 — up from baseline \$13,600'),
        _Step('💡', 'Recommendations',
            'Migrate worker nodes to Spot Instances • Downsize over-provisioned databases'),
        _Step('✅', 'Savings',
            'Potential savings identified: \$4,200/month'),
      ],
    ),
    _Scenario(
      label: 'Database Failure',
      badge: 'Critical Incident',
      badgeColor: _red,
      title: 'Critical Database Connection Failure',
      desc:
          'A standard database log exception triggers the full AI Incident Analyst pipeline.',
      steps: const [
        _Step('🔍', 'Log Parsed',
            'ERROR: Database Connection Failed — detected in 1,247 log events'),
        _Step('🎯', 'Root Cause',
            'Root Cause: Expired Database Credentials'),
        _Step('⚠️', 'Severity',
            'Severity: Critical / Priority: High — immediate action required'),
        _Step('🔔', 'Notified',
            'Recovery plan dispatched → Email, Slack, Microsoft Teams'),
      ],
    ),
  ];

  @override
  Widget build(BuildContext context) {
    final scenario = _scenarios[_active];
    return Container(
      padding:
          const EdgeInsets.symmetric(vertical: 80, horizontal: 24),
      decoration: const BoxDecoration(
        color: _bgSecondary,
        border:
            Border.symmetric(horizontal: BorderSide(color: _border)),
      ),
      child: Column(
        children: [
          const _SectionHeader(
            eyebrow: 'Live Demo',
            title: 'See CloudGuardian AI in action',
            sub:
                'Two reference scenarios showing how the platform responds to real events.',
            eyebrowColor: _cyan,
          ),
          const SizedBox(height: 40),

          // Tabs
          Row(
            mainAxisSize: MainAxisSize.min,
            children: List.generate(_scenarios.length, (i) {
              final active = i == _active;
              return GestureDetector(
                onTap: () => setState(() => _active = i),
                child: Container(
                  margin: const EdgeInsets.only(right: 8),
                  padding: const EdgeInsets.symmetric(
                      horizontal: 20, vertical: 10),
                  decoration: BoxDecoration(
                    border: Border(
                        bottom: BorderSide(
                            color: active ? _blue : Colors.transparent,
                            width: 2)),
                  ),
                  child: Text(_scenarios[i].label,
                      style: GoogleFonts.inter(
                          fontSize: 14,
                          fontWeight: FontWeight.w500,
                          color: active ? _blue : _textMuted)),
                ),
              );
            }),
          ),

          const SizedBox(height: 32),

          // Responsive panel
          LayoutBuilder(builder: (_, constraints) {
            final wide = constraints.maxWidth > 650;
            final left = Expanded(
              flex: wide ? 4 : 1,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Container(
                    padding: const EdgeInsets.symmetric(
                        horizontal: 12, vertical: 4),
                    decoration: BoxDecoration(
                      color: scenario.badgeColor.withAlpha(26),
                      border: Border.all(
                          color: scenario.badgeColor.withAlpha(77)),
                      borderRadius: BorderRadius.circular(100),
                    ),
                    child: Text(scenario.badge,
                        style: GoogleFonts.inter(
                            fontSize: 11,
                            fontWeight: FontWeight.w600,
                            color: scenario.badgeColor)),
                  ),
                  const SizedBox(height: 14),
                  Text(scenario.title,
                      style: GoogleFonts.inter(
                          fontSize: 18,
                          fontWeight: FontWeight.w700,
                          color: _textPrimary)),
                  const SizedBox(height: 10),
                  Text(scenario.desc,
                      style: GoogleFonts.inter(
                          fontSize: 13,
                          color: _textSecondary,
                          height: 1.7)),
                ],
              ),
            );

            final right = Expanded(
              flex: wide ? 6 : 1,
              child: Column(
                children: scenario.steps.asMap().entries.map((e) {
                  final isLast =
                      e.key == scenario.steps.length - 1;
                  final step = e.value;
                  return Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Column(
                        children: [
                          Container(
                            width: 40,
                            height: 40,
                            decoration: BoxDecoration(
                                color: _bgCard,
                                border:
                                    Border.all(color: _border),
                                borderRadius:
                                    BorderRadius.circular(10)),
                            child: Center(
                                child: Text(step.icon,
                                    style: const TextStyle(
                                        fontSize: 18))),
                          ),
                          if (!isLast)
                            Container(
                                width: 1,
                                height: 28,
                                color: _border),
                        ],
                      ),
                      const SizedBox(width: 16),
                      Expanded(
                        child: Padding(
                          padding: EdgeInsets.only(
                              bottom: isLast ? 0 : 16, top: 8),
                          child: Column(
                            crossAxisAlignment:
                                CrossAxisAlignment.start,
                            children: [
                              Text(step.label.toUpperCase(),
                                  style: GoogleFonts.inter(
                                      fontSize: 11,
                                      fontWeight:
                                          FontWeight.w600,
                                      color: _textMuted,
                                      letterSpacing: 0.06)),
                              const SizedBox(height: 4),
                              Text(step.detail,
                                  style: GoogleFonts.inter(
                                      fontSize: 13,
                                      color: _textPrimary,
                                      height: 1.5)),
                            ],
                          ),
                        ),
                      ),
                    ],
                  );
                }).toList(),
              ),
            );

            if (wide) {
              return Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [left, const SizedBox(width: 48), right],
              );
            } else {
              return Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  left,
                  const SizedBox(height: 32),
                  right
                ],
              );
            }
          }),
        ],
      ),
    );
  }
}

// Data classes for demo section
class _Scenario {
  final String label, badge, title, desc;
  final Color badgeColor;
  final List<_Step> steps;
  const _Scenario(
      {required this.label,
      required this.badge,
      required this.badgeColor,
      required this.title,
      required this.desc,
      required this.steps});
}

class _Step {
  final String icon, label, detail;
  const _Step(this.icon, this.label, this.detail);
}

// ─── Modules ──────────────────────────────────────────────────────────────────
class _ModulesSection extends StatelessWidget {
  const _ModulesSection();

  @override
  Widget build(BuildContext context) {
    final modules = [
      _ModuleData(
        number: '01',
        title: 'AI Cloud CFO',
        color: _green,
        desc:
            'Automated cloud financial advisor. Monitors usage, forecasts bills, explains budget drivers, and finds savings opportunities.',
        caps: const [
          'Cost Prediction',
          'Cost Explanation',
          'Savings Recommendations',
          'Resource Optimization'
        ],
      ),
      _ModuleData(
        number: '02',
        title: 'AI Incident Analyst',
        color: _blue,
        desc:
            'Automated cloud engineer. Parses log streams, identifies root causes, classifies severity, and generates recovery plans.',
        caps: const [
          'Log Analysis',
          'Root Cause Detection',
          'Severity Assessment',
          'Recovery Recommendations'
        ],
      ),
      _ModuleData(
        number: '03',
        title: 'Notification Center',
        color: _purple,
        desc:
            'Keeps every stakeholder informed. Rich, structured templates delivered via Email, Slack webhooks, and Microsoft Teams cards.',
        caps: const [
          'Email Notifications',
          'Slack Alerts',
          'MS Teams Cards',
          'Custom Templates'
        ],
      ),
      _ModuleData(
        number: '04',
        title: 'Unified Dashboard',
        color: _orange,
        desc:
            'Single pane of glass for cloud operations. Cost trends, active incidents, recovery timelines, and optimization history.',
        caps: const [
          'Cost Dashboard',
          'Incident Dashboard',
          'Reports Dashboard',
          'Real-time Updates'
        ],
      ),
    ];

    return Container(
      padding:
          const EdgeInsets.symmetric(vertical: 80, horizontal: 24),
      color: _bgPrimary,
      child: Column(
        children: [
          const _SectionHeader(
            eyebrow: 'Architecture',
            title: 'Four modules, one platform',
            sub:
                'Each module is independently focused but fully integrated.',
            eyebrowColor: _purple,
          ),
          const SizedBox(height: 48),
          _ResponsiveGrid(
            children: modules
                .map((m) => _ModuleCard(data: m))
                .toList(),
          ),
        ],
      ),
    );
  }
}

class _ModuleData {
  final String number, title, desc;
  final Color color;
  final List<String> caps;
  const _ModuleData(
      {required this.number,
      required this.title,
      required this.color,
      required this.desc,
      required this.caps});
}

class _ModuleCard extends StatelessWidget {
  final _ModuleData data;
  const _ModuleCard({required this.data});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: _bgCard,
        border: Border.all(color: _border),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(children: [
            Text(data.number,
                style: GoogleFonts.inter(
                    fontSize: 28,
                    fontWeight: FontWeight.w900,
                    color: data.color)),
            const SizedBox(width: 16),
            Expanded(
                child: Container(
                    height: 2,
                    decoration: BoxDecoration(
                        gradient: LinearGradient(colors: [
                          data.color,
                          data.color.withAlpha(0)
                        ]),
                        borderRadius:
                            BorderRadius.circular(2)))),
          ]),
          const SizedBox(height: 10),
          Text(data.title,
              style: GoogleFonts.inter(
                  fontSize: 15,
                  fontWeight: FontWeight.w700,
                  color: data.color)),
          const SizedBox(height: 8),
          Text(data.desc,
              style: GoogleFonts.inter(
                  fontSize: 13,
                  color: _textSecondary,
                  height: 1.65)),
          const SizedBox(height: 14),
          ...data.caps.map((c) => Padding(
                padding: const EdgeInsets.only(bottom: 6),
                child: Row(children: [
                  Container(
                      width: 5,
                      height: 5,
                      decoration: BoxDecoration(
                          color: data.color,
                          shape: BoxShape.circle)),
                  const SizedBox(width: 8),
                  Text(c,
                      style: GoogleFonts.inter(
                          fontSize: 13,
                          color: _textSecondary)),
                ]),
              )),
        ],
      ),
    );
  }
}

// ─── Tech Stack ───────────────────────────────────────────────────────────────
class _TechStackSection extends StatelessWidget {
  const _TechStackSection();

  @override
  Widget build(BuildContext context) {
    const stack = [
      ('⚛️', 'Frontend',       'React / Next.js',           _cyan),
      ('🟢', 'Backend',        'Node.js',                   _green),
      ('🍃', 'Database',       'MongoDB',                   _green),
      ('🤖', 'AI / LLM',       'Claude · OpenAI · Bedrock', _purple),
      ('🔔', 'Notifications',  'SMTP · Slack · MS Teams',   _orange),
      ('☁️', 'Infrastructure', 'Amazon Web Services',        _orange),
    ];

    return Container(
      padding:
          const EdgeInsets.symmetric(vertical: 72, horizontal: 24),
      decoration: const BoxDecoration(
        color: _bgSecondary,
        border:
            Border.symmetric(horizontal: BorderSide(color: _border)),
      ),
      child: Column(
        children: [
          const _SectionHeader(
            eyebrow: 'Technology',
            title: 'Built on a proven stack',
            sub: '',
            eyebrowColor: _orange,
          ),
          const SizedBox(height: 40),
          _ResponsiveGrid(
            children: stack
                .map((s) => Container(
                      padding: const EdgeInsets.all(20),
                      decoration: BoxDecoration(
                        color: _bgCard,
                        border: Border.all(color: _border),
                        borderRadius: BorderRadius.circular(10),
                      ),
                      child: Row(children: [
                        Text(s.$1,
                            style: const TextStyle(fontSize: 26)),
                        const SizedBox(width: 14),
                        Column(
                            crossAxisAlignment:
                                CrossAxisAlignment.start,
                            children: [
                              Text(s.$2,
                                  style: GoogleFonts.inter(
                                      fontSize: 10,
                                      fontWeight:
                                          FontWeight.w600,
                                      color: _textMuted,
                                      letterSpacing: 0.08)),
                              const SizedBox(height: 2),
                              Text(s.$3,
                                  style: GoogleFonts.inter(
                                      fontSize: 13,
                                      fontWeight:
                                          FontWeight.w600,
                                      color: s.$4)),
                            ]),
                      ]),
                    ))
                .toList(),
          ),
        ],
      ),
    );
  }
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
class _CTASection extends StatelessWidget {
  const _CTASection();

  @override
  Widget build(BuildContext context) {
    final w = MediaQuery.of(context).size.width;
    return Container(
      padding:
          const EdgeInsets.symmetric(vertical: 96, horizontal: 24),
      color: _bgPrimary,
      child: Column(
        children: [
          Text(
            'Ready to put your cloud on autopilot?',
            textAlign: TextAlign.center,
            style: GoogleFonts.inter(
                fontSize: w < 600 ? 26 : 36,
                fontWeight: FontWeight.w800,
                color: _textPrimary,
                height: 1.2),
          ),
          const SizedBox(height: 20),
          ConstrainedBox(
            constraints: const BoxConstraints(maxWidth: 480),
            child: Text(
              'Get full visibility into costs and incidents from day one. '
              'Connect and let the AI work.',
              textAlign: TextAlign.center,
              style: GoogleFonts.inter(
                  fontSize: 15, color: _textSecondary, height: 1.7),
            ),
          ),
          const SizedBox(height: 32),
          Wrap(
            spacing: 12,
            runSpacing: 12,
            alignment: WrapAlignment.center,
            children: [
              _PrimaryBtn('Explore the Platform  →', onTap: () {}),
              _OutlineBtn('View on GitHub', onTap: () async {
                final uri = Uri.parse('https://github.com');
                if (await canLaunchUrl(uri)) launchUrl(uri);
              }),
            ],
          ),
        ],
      ),
    );
  }
}

// ─── Footer ───────────────────────────────────────────────────────────────────
class _Footer extends StatelessWidget {
  const _Footer();

  @override
  Widget build(BuildContext context) {
    return Container(
      padding:
          const EdgeInsets.symmetric(vertical: 28, horizontal: 24),
      decoration: const BoxDecoration(
        color: _bgSecondary,
        border: Border(top: BorderSide(color: _border)),
      ),
      child: Wrap(
        alignment: WrapAlignment.spaceBetween,
        runSpacing: 12,
        children: [
          const _Logo(),
          Row(mainAxisSize: MainAxisSize.min, children: const [
            _FooterLink('Features'),
            _FooterLink('Modules'),
            _FooterLink('Demo'),
            _FooterLink('Stack'),
          ]),
          Text(
            'Built for the Ship With Kiro Hackathon',
            style: GoogleFonts.inter(
                fontSize: 12, color: _textMuted),
          ),
        ],
      ),
    );
  }
}

class _FooterLink extends StatelessWidget {
  final String label;
  const _FooterLink(this.label);
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(right: 20),
      child: Text(label,
          style:
              GoogleFonts.inter(fontSize: 13, color: _textMuted)),
    );
  }
}

// ─── Shared helpers ───────────────────────────────────────────────────────────
class _SectionHeader extends StatelessWidget {
  final String eyebrow, title, sub;
  final Color eyebrowColor;
  const _SectionHeader(
      {required this.eyebrow,
      required this.title,
      required this.sub,
      required this.eyebrowColor});

  @override
  Widget build(BuildContext context) {
    final w = MediaQuery.of(context).size.width;
    return Column(children: [
      if (eyebrow.isNotEmpty)
        Text(eyebrow.toUpperCase(),
            style: GoogleFonts.inter(
                fontSize: 11,
                fontWeight: FontWeight.w600,
                letterSpacing: 0.1,
                color: eyebrowColor)),
      const SizedBox(height: 10),
      Text(title,
          textAlign: TextAlign.center,
          style: GoogleFonts.inter(
              fontSize: w < 600 ? 24 : 32,
              fontWeight: FontWeight.w800,
              color: _textPrimary,
              letterSpacing: -0.5)),
      if (sub.isNotEmpty) ...[
        const SizedBox(height: 14),
        ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 480),
          child: Text(sub,
              textAlign: TextAlign.center,
              style: GoogleFonts.inter(
                  fontSize: 14,
                  color: _textSecondary,
                  height: 1.7)),
        ),
      ],
    ]);
  }
}

class _ResponsiveGrid extends StatelessWidget {
  final List<Widget> children;
  const _ResponsiveGrid({required this.children});

  @override
  Widget build(BuildContext context) {
    final w = MediaQuery.of(context).size.width;
    final cols = w < 600 ? 1 : (w < 960 ? 2 : 3);
    final rows = <List<Widget>>[];
    for (var i = 0; i < children.length; i += cols) {
      rows.add(
          children.sublist(i, (i + cols).clamp(0, children.length)));
    }
    return Column(
      children: rows
          .map((row) => Padding(
                padding: const EdgeInsets.only(bottom: 16),
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: row
                      .asMap()
                      .entries
                      .map((e) => Expanded(
                            child: Padding(
                              padding: EdgeInsets.only(
                                  left: e.key > 0 ? 16 : 0),
                              child: e.value,
                            ),
                          ))
                      .toList(),
                ),
              ))
          .toList(),
    );
  }
}
