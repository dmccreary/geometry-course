# AI Assisted Geometry Course

<div align="center">

[![Website](https://img.shields.io/website?url=https%3A%2F%2Fdmccreary.github.io%2Fgeometry-course%2F)](https://dmccreary.github.io/geometry-course/)
[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC_BY--NC_4.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)
[![Built with MkDocs](https://img.shields.io/badge/Built_with-MkDocs-blue.svg)](https://www.mkdocs.org/)
[![Material for MkDocs](https://img.shields.io/badge/Material_for-MkDocs-blue.svg)](https://squidfunk.github.io/mkdocs-material/)
[![Deployed with GitHub Pages](https://img.shields.io/badge/Deployed_with-GitHub_Pages-green.svg)](https://pages.github.com/)

**[Visit Website](https://dmccreary.github.io/geometry-course/)** | **[View Documentation](https://dmccreary.github.io/geometry-course/)** | **[Explore MicroSims](https://dmccreary.github.io/geometry-course/sims/)**

</div>

---

An AI-assisted geometry course designed for high school students (grades 9-12) featuring interactive learning graphs and MicroSims (micro-simulations). This comprehensive educational resource makes geometry concepts accessible through visual, interactive demonstrations powered by p5.js and structured learning paths.

## Table of Contents

- [Features](#-features)
- [Course Structure](#-course-structure)
- [Quick Start](#-quick-start)
- [Getting Started](#-getting-started)
  - [For Students](#for-students)
  - [For Developers](#for-developers)
- [Built With](#️-built-with)
- [Usage](#-usage)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)
- [Contact](#-contact)

## 🎯 Features

- **Interactive MicroSims**: Visual, hands-on simulations for key geometry concepts
- **Learning Graph**: Structured dependency mapping of geometry concepts
- **Comprehensive Coverage**: 12 chapters covering fundamental to advanced topics
- **AI-Assisted Development**: Modern pedagogical approach using AI tools
- **Creative Commons License**: Open educational resource for widespread use

## 📚 Course Structure

### Chapters
1. **Introduction to Geometry** - Basic concepts and angle exploration
2. **Reasoning and Proofs** - Logical thinking and geometric proofs
3. **Lines** - Properties and relationships of lines
4. **Congruent Triangles** - Triangle congruence theorems
5. **Properties of Triangles** - Special triangle properties
6. **Polygons** - Multi-sided figures and their properties
7. **Similarity** - Similar figures and proportional reasoning
8. **Right Triangles and Trigonometry** - Pythagorean theorem and trig functions
9. **Circles** - Circle properties, chords, and relationships
10. **Area and Perimeters** - Measurement of 2D figures
11. **Surface Area and Volume** - 3D figure measurements
12. **Transformations** - Geometric transformations and symmetry

### Interactive Components
- **MicroSims Gallery** - Interactive simulations for visual learning
- **Sample Prompts** - AI prompts used in course development
- **Glossary** - Comprehensive geometry terminology
- **References** - Academic and educational resources

## 🚀 Quick Start

**For Students**: Simply visit [https://dmccreary.github.io/geometry-course/](https://dmccreary.github.io/geometry-course/) and start exploring!

**For Developers**: Get the site running locally in 3 steps:

```bash
git clone https://github.com/dmccreary/geometry-course.git
cd geometry-course
pip install mkdocs mkdocs-material && mkdocs serve
```

Then open [http://localhost:8000](http://localhost:8000) in your browser.

## 🚀 Getting Started

### For Students

No installation required! Simply:
1. Visit the [live website](https://dmccreary.github.io/geometry-course/)
2. Browse the [12 chapters](https://dmccreary.github.io/geometry-course/chapters/) organized by topic
3. Interact with [MicroSims](https://dmccreary.github.io/geometry-course/sims/) to visualize concepts
4. Use the [learning graph](https://dmccreary.github.io/geometry-course/sims/graph-viewer/) to understand concept dependencies

**Prerequisites**: Web browser with JavaScript enabled and basic understanding of algebra.

### For Developers

#### Prerequisites
- Python 3.x
- pip (Python package manager)
- Git

#### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/dmccreary/geometry-course.git
   cd geometry-course
   ```

2. **Install dependencies**

   Using pip:
   ```bash
   pip install mkdocs mkdocs-material
   ```

   Or using conda:
   ```bash
   conda create -n mkdocs python=3
   conda activate mkdocs
   pip install mkdocs "mkdocs-material[imaging]"
   ```

3. **Run the development server**
   ```bash
   mkdocs serve
   ```

   The site will be available at [http://localhost:8000](http://localhost:8000)

#### Building and Deployment

```bash
# Build the static site (outputs to ./site directory)
mkdocs build

# Deploy to GitHub Pages (requires write access)
mkdocs gh-deploy
```

#### Development Workflow

See [CLAUDE.md](CLAUDE.md) for detailed architecture information and workflows for:
- Creating new MicroSims
- Adding chapters
- Working with the learning graph
- Understanding the codebase structure

## 🛠️ Built With

- **[MkDocs](https://www.mkdocs.org/)** - Static site generator
- **[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)** - Modern theme
- **[p5.js](https://p5js.org/)** - Interactive graphics and simulations
- **[GitHub Pages](https://pages.github.com/)** - Hosting and deployment
- **[MathJax](https://www.mathjax.org/)** - Mathematical notation rendering

## 📖 Usage

Visit the [live website](https://dmccreary.github.io/geometry-course/) to:
- Explore interactive geometry simulations
- Follow structured learning paths
- Access comprehensive reference materials
- Use the course for educational purposes

## 🤝 Contributing

We welcome contributions from educators, developers, and students! Here's how you can help:

### Ways to Contribute

- 🐛 **Report bugs** - Found an issue? [Open an issue](https://github.com/dmccreary/geometry-course/issues)
- 💡 **Suggest features** - Have an idea? Share it in the [discussions](https://github.com/dmccreary/geometry-course/discussions)
- 📝 **Improve documentation** - Fix typos, clarify explanations, add examples
- 🎨 **Create MicroSims** - Build new interactive simulations using p5.js
- ✏️ **Enhance content** - Improve lessons, add exercises, refine explanations

### Contribution Workflow

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/geometry-course.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing MkDocs structure in `docs/`
   - Test all interactive simulations locally
   - Ensure educational clarity and accuracy

4. **Test locally**
   ```bash
   mkdocs serve
   ```

5. **Commit your changes**
   ```bash
   git commit -m "Add: brief description of your changes"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Open a Pull Request**
   - Provide a clear description of your changes
   - Reference any related issues
   - Include screenshots for visual changes

### Development Guidelines

- **Code Style**: Follow existing patterns in MicroSim JavaScript files
- **Documentation**: Include markdown documentation for all new content
- **Testing**: Verify MicroSims work across browsers (Chrome, Firefox, Safari)
- **Educational Focus**: Target high school students (grades 9-12)
- **Accessibility**: Ensure content is clear and understandable
- **License Compliance**: All contributions must be compatible with CC BY-NC 4.0

For detailed development information, see [CLAUDE.md](CLAUDE.md).

## 📄 License

This work is licensed under a **[Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/)**.

**You are free to:**
- ✅ Share — copy and redistribute the material
- ✅ Adapt — remix, transform, and build upon the material

**Under the following terms:**
- 📝 Attribution — Give appropriate credit
- 🚫 NonCommercial — Not for commercial use

See [LICENSE](docs/license.md) for complete terms.

## 💬 Support

### Getting Help

- 📖 **Documentation**: Check the [website documentation](https://dmccreary.github.io/geometry-course/)
- 💭 **Discussions**: Ask questions in [GitHub Discussions](https://github.com/dmccreary/geometry-course/discussions)
- 🐛 **Issues**: Report bugs via [GitHub Issues](https://github.com/dmccreary/geometry-course/issues)
- 📧 **Contact**: See the [Contact page](docs/contact.md) for direct communication

### Frequently Asked Questions

**Q: Can I use this course in my classroom?**
A: Yes! This is an open educational resource designed for educational use.

**Q: How do I create my own MicroSim?**
A: See the [MicroSim templates](https://dmccreary.github.io/geometry-course/sims/templates/) and [CLAUDE.md](CLAUDE.md) for guidance.

**Q: Can I contribute if I'm not a developer?**
A: Absolutely! We welcome content improvements, educational feedback, and documentation enhancements.

## 🙏 Acknowledgments

- **[NYU Interactive Telecommunications Program (ITP)](https://tisch.nyu.edu/itp)** and the p5.js community for creating and maintaining the p5.js library that powers our interactive MicroSims
- **[MkDocs](https://www.mkdocs.org/)** and **[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)** teams for excellent documentation tools
- **Open-source contributors** and educators who help improve this resource
- **[Creative Commons](https://creativecommons.org/)** for promoting open educational resources
- **AI tools** (ChatGPT, Claude) used in developing course content and simulations

## 📞 Contact

**Project Maintainer**: Dan McCreary

**Links**:
- 🌐 [Project Website](https://dmccreary.github.io/geometry-course/)
- 💬 [GitHub Discussions](https://github.com/dmccreary/geometry-course/discussions)
- 📧 [Contact Page](docs/contact.md)

For questions, suggestions, or collaboration opportunities, please open a discussion or see the contact page.

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

*Making geometry accessible through interactive, AI-assisted learning*

</div>