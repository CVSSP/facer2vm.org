---
title: Efficient 3D Morphable Face Model Fitting
description: >-
  3D face reconstruction of shape and skin texture from a single 2D image using
  a 3D Morphable Model (3DMM) in an analysis-by-synthesis approach.
date: 2017-02-22T15:17:00.000Z
people:
  - Patrik Huber
tags:
  - Publications
---

3D face reconstruction of shape and skin texture from a single 2D image can be
performed using a 3D Morphable Model (3DMM) in an analysis-by-synthesis
approach. However, performing this reconstruction (fitting) efficiently and
accurately in a general imaging scenario is a challenge. Such a scenario would
involve a perspective camera to describe the geometric projection from 3D to 2D,
and the Phong model to characterise illumination. Under these imaging
assumptions the reconstruction problem is nonlinear and, consequently,
computationally very demanding. In this work, we present an efficient stepwise
3DMM-to-2D image-fitting procedure, which sequentially optimises the pose,
shape, light direction, light strength and skin texture parameters in separate
steps. By linearising each step of the fitting process we derive closed-form
solutions for the recovery of the respective parameters, leading to efficient
fitting. The proposed optimisation process involves all the pixels of the input
image, rather than randomly selected subsets, which enhances the accuracy of the
fitting. It is referred to as Efficient Stepwise Optimisation (ESO).


### Details

*This work was published in [Pattern Recognition][PR].*


**Volume:** 67\\
**Year:** 2017\\
**Pages:** 366-379\\
**DOI:** [10.1016/j.patcog.2017.02.007][DOI]


### Attachments

* [Full-text PDF][FULLTEXT] (3.43 Mb) -- cite as:\\
G Hu, F Yan, J Kittler, W Christmas, C Chan, Z Feng, P Huber, Efficient 3D
Morphable Face Model Fitting, Pattern Recognition, 67:366-367, 2017



[DOI]: //dx.doi.org/10.1016/j.patcog.2017.02.007
[FULLTEXT]: //ln.facer2vm.org/pr2017-eso_pdf
[PR]: //www.journals.elsevier.com/pattern-recognition
