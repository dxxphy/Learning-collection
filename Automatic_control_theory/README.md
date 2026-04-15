# Automatic Control Theory

SDM263 Automatic Control Theory course notes, organized as Markdown files with selected figures under `assets/`.

The notes are written mainly in Chinese, with key control theory terms preserved in English where useful. They are intended for review, homework reference, and quick lookup of concepts, formulas, examples, SAQs, and exercises.

## Chapter Index

| Chapter | Topic | Notes |
| --- | --- | --- |
| 0 | Course information | [自动控制class0 课程说明.md](./自动控制class0%20课程说明.md) |
| 1 | Introduction to automation and control systems | [自动控制class1 概述.md](./自动控制class1%20概述.md) |
| 2 | Mathematical foundations: complex variables, differential equations, Laplace transform | [自动控制class2 数学基础.md](./自动控制class2%20数学基础.md) |
| 3 | Transfer functions, block diagrams, signal-flow graphs | [自动控制class3 传递函数与方块图.md](./自动控制class3%20传递函数与方块图.md) |
| 4 | Physical system modelling: electrical, mechanical, DC motor models | [自动控制class4 物理系统建模.md](./自动控制class4%20物理系统建模.md) |
| 5 | Stability analysis and Routh-Hurwitz criterion | [自动控制class5 稳定性分析.md](./自动控制class5%20稳定性分析.md) |
| 6 | Time-domain analysis, steady-state error, transient response, dominant poles | [自动控制class6 时域分析.md](./自动控制class6%20时域分析.md) |
| 7 | Root locus method and controller design | [自动控制class7 根轨迹法.md](./自动控制class7%20根轨迹法.md) |

## Repository Structure

```text
.
├── README.md
├── 自动控制class0 课程说明.md
├── 自动控制class1 概述.md
├── 自动控制class2 数学基础.md
├── 自动控制class3 传递函数与方块图.md
├── 自动控制class4 物理系统建模.md
├── 自动控制class5 稳定性分析.md
├── 自动控制class6 时域分析.md
├── 自动控制class7 根轨迹法.md
└── assets/
    ├── auto-control-class1-introduction/
    ├── auto-control-class2-maths/
    ├── auto-control-class3-transfer-functions/
    ├── auto-control-class4-modelling/
    ├── auto-control-class5-stability/
    ├── auto-control-class6-time-domain/
    └── auto-control-class7-root-locus/
```

## How to Use

Start with Chapter 1 if you want the conceptual motivation for feedback control, or Chapter 2 if you want to review the mathematical tools first. For problem solving, Chapters 3 to 7 are the main technical sequence:

1. Build transfer functions from differential equations.
2. Simplify block diagrams and signal-flow graphs.
3. Model physical systems such as RLC circuits, mass-spring-damper systems, and DC motors.
4. Analyze stability with pole locations and the Routh-Hurwitz criterion.
5. Evaluate time-domain performance and steady-state error.
6. Use root locus to study gain effects and controller design.

## Notes

- Figures are stored in `assets/` and referenced by the chapter Markdown files.
- SAQs and exercises are grouped inside the corresponding chapter notes.
- This repository is a study-note collection rather than an official course release.
