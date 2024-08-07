export type TArxivEntry = {
  id: string[];
  updated: string[];
  published: string[];
  title: string[];
  summary: string[];
  author: {
    name: string[];
  }[];
  "arxiv:comment"?: {
    _: string;
    $: {
      "xmlns:arxiv": string;
    };
  }[];
  link: {
    $: {
      href: string;
      rel: string;
      type: string;
      title?: string;
    };
  }[];
  "arxiv:primary_category": {
    $: {
      "xmlns:arxiv": string;
      term: string;
      scheme: string;
    };
  }[];
  category: {
    $: {
      term: string;
      scheme: string;
    };
  }[];
};

export type TSubject = {
  abbreviation: string;
  full_name: string;
  description: string;
};

export type TCategory = {
  category: string;
  subjects: TSubject[];
};

export type TSubjectWithCategory = TSubject & { category: string };

export type NewArxivEntry = {
  id: string;
  title: string;
  summary: string;
  published: string;
  updated: string;
  authors: { name: string }[];
  links: string[];
};

const exampleResults = {
  totalResults: 0,
  startIndex: 0,
  itemsPerPage: 0,
  entries: [
    {
      id: "http://arxiv.org/abs/1712.10042v1",
      title: "Discriminative and Geometry Aware Unsupervised Domain Adaptation",
      summary:
        "Domain adaptation (DA) aims to generalize a learning model across training\nand testing data despite the mismatch of their data distributions. In light of\na theoretical estimation of upper error bound, we argue in this paper that an\neffective DA method should 1) search a shared feature subspace where source and\ntarget data are not only aligned in terms of distributions as most state of the\nart DA methods do, but also discriminative in that instances of different\nclasses are well separated; 2) account for the geometric structure of the\nunderlying data manifold when inferring data labels on the target domain. In\ncomparison with a baseline DA method which only cares about data distribution\nalignment between source and target, we derive three different DA models,\nnamely CDDA, GA-DA, and DGA-DA, to highlight the contribution of Close yet\nDiscriminative DA(CDDA) based on 1), Geometry Aware DA (GA-DA) based on 2), and\nfinally Discriminative and Geometry Aware DA (DGA-DA) implementing jointly 1)\nand 2). Using both synthetic and real data, we show the effectiveness of the\nproposed approach which consistently outperforms state of the art DA methods\nover 36 image classification DA tasks through 6 popular benchmarks. We further\ncarry out in-depth analysis of the proposed DA method in quantifying the\ncontribution of each term of our DA model and provide insights into the\nproposed DA methods in visualizing both real and synthetic data.",
      published: "2017-12-28T20:02:49Z",
      updated: "2017-12-28T20:02:49Z",
      authors: [
        {
          name: "Lingkun Luo",
        },
        {
          name: "Liming Chen",
        },
        {
          name: "Shiqiang Hu",
        },
        {
          name: "Ying Lu",
        },
        {
          name: "Xiaofang Wang",
        },
      ],
      links: ["", ""],
    },
    {
      id: "http://arxiv.org/abs/2107.08328v1",
      title: "A Geometria da Regressão Linear",
      summary:
        "We present a geometrical interpretation of linear regression based on vectors\nin n dimensions (n the number of data points). This is to be used as a didactic\ntool for teachers when presenting that topic.",
      published: "2021-07-18T00:15:13Z",
      updated: "2021-07-18T00:15:13Z",
      authors: {
        name: "Carlos Gomes",
      },
      links: ["", ""],
    },
    {
      id: "http://arxiv.org/abs/2402.00868v3",
      title:
        "We're Not Using Videos Effectively: An Updated Domain Adaptive Video\n  Segmentation Baseline",
      summary:
        "There has been abundant work in unsupervised domain adaptation for semantic\nsegmentation (DAS) seeking to adapt a model trained on images from a labeled\nsource domain to an unlabeled target domain. While the vast majority of prior\nwork has studied this as a frame-level Image-DAS problem, a few Video-DAS works\nhave sought to additionally leverage the temporal signal present in adjacent\nframes. However, Video-DAS works have historically studied a distinct set of\nbenchmarks from Image-DAS, with minimal cross-benchmarking. In this work, we\naddress this gap. Surprisingly, we find that (1) even after carefully\ncontrolling for data and model architecture, state-of-the-art Image-DAS methods\n(HRDA and HRDA+MIC) outperform Video-DAS methods on established Video-DAS\nbenchmarks (+14.5 mIoU on Viper$\\rightarrow$CityscapesSeq, +19.0 mIoU on\nSynthia$\\rightarrow$CityscapesSeq), and (2) naive combinations of Image-DAS and\nVideo-DAS techniques only lead to marginal improvements across datasets. To\navoid siloed progress between Image-DAS and Video-DAS, we open-source our\ncodebase with support for a comprehensive set of Video-DAS and Image-DAS\nmethods on a common benchmark. Code available at\nhttps://github.com/SimarKareer/UnifiedVideoDA",
      published: "2024-02-01T18:59:56Z",
      updated: "2024-02-27T22:25:15Z",
      authors: [
        {
          name: "Simar Kareer",
        },
        {
          name: "Vivek Vijaykumar",
        },
        {
          name: "Harsh Maheshwari",
        },
        {
          name: "Prithvijit Chattopadhyay",
        },
        {
          name: "Judy Hoffman",
        },
        {
          name: "Viraj Prabhu",
        },
      ],
      links: ["", ""],
    },
    {
      id: "http://arxiv.org/abs/1810.03554v2",
      title:
        "A Study of Cool White Dwarfs in the Sloan Digital Sky Survey Data\n  Release 12",
      summary:
        "In this work we study white dwarfs where $30\\,000\\,\\text{K} {>}\n\\mathrm{T}_{\\rm{eff}} {>} 5\\,000\\,\\text{K}$ to compare the differences in the\ncooling of DAs and non-DAs and their formation channels. Our final sample is\ncomposed by nearly $13\\,000$ DAs and more than $3\\,000$ non-DAs that are\nsimultaneously in the SDSS DR12 spectroscopic database and in the \\textit{Gaia}\nsurvey DR2. We present the mass distribution for DAs, DBs and DCs, where it is\nfound that the DCs are ${\\sim}0.15\\,\\mathrm{M}_\\odot$ more massive than DAs and\nDBs on average. Also we present the photometric effective temperature\ndistribution for each spectral type and the distance distribution for DAs and\nnon-DAs. In addition, we study the ratio of non-DAs to DAs as a function of\neffective temperature. We find that this ratio is around ${\\sim}0.075$ for\neffective temperature above ${\\sim}22\\,000\\,\\text{K}$ and increases by a factor\nof five for effective temperature cooler than $15\\,000\\,\\text{K}$. If we assume\nthat the increase of non-DA stars between ${\\sim}22\\,000\\,\\text{K}$ to\n${\\sim}15\\,000\\,\\text{K}$ is due to convective dilution, $14{\\pm}3$ per cent of\nthe DAs should turn into non-DAs to explain the observed ratio. Our\ndetermination of the mass distribution of DCs also agrees with the theory that\nconvective dilution and mixing are more likely to occur in massive white\ndwarfs, which supports evolutionary models and observations suggesting that\nhigher mass white dwarfs have thinner hydrogen layers.",
      published: "2018-10-08T16:12:53Z",
      updated: "2018-10-09T17:20:55Z",
      authors: [
        {
          name: "G. Ourique",
        },
        {
          name: "A. D. Romero",
        },
        {
          name: "S. O. Kepler",
        },
        {
          name: "D. Koester",
        },
        {
          name: "L. A. Amaral",
        },
      ],
      links: ["", "", ""],
    },
    {
      id: "http://arxiv.org/abs/1311.0816v2",
      title: "On Leonardo da Vinci's proof of the Theorem of Pythagoras",
      summary:
        "We show that Leonardo da Vinci's well known proof of the Pythagorean theorem\nis due to Mayer and not to da Vinci.",
      published: "2013-11-04T19:15:41Z",
      updated: "2014-01-15T16:28:23Z",
      authors: {
        name: "Franz Lemmermeyer",
      },
      links: ["", ""],
    },
    {
      id: "http://arxiv.org/abs/1806.04843v1",
      title: "Various Non-autonomous Notions for Borel Measures",
      summary:
        "We introduce and investigate the notions of expansiveness, topological\nstability and persistence for Borel measures with respect to time varying\nbi-measurable maps on metric spaces. We prove that expansive persistent\nmeasures are topologically stable in the class of all time varying\nhomeomorphisms.",
      published: "2018-06-13T04:45:58Z",
      updated: "2018-06-13T04:45:58Z",
      authors: [
        {
          name: "Pramod Das",
        },
        {
          name: "Tarun Das",
        },
      ],
      links: ["", "", ""],
    },
    {
      id: "http://arxiv.org/abs/2210.08170v1",
      title: "Attention Regularized Laplace Graph for Domain Adaptation",
      summary:
        "In leveraging manifold learning in domain adaptation (DA), graph\nembedding-based DA methods have shown their effectiveness in preserving data\nmanifold through the Laplace graph. However, current graph embedding DA methods\nsuffer from two issues: 1). they are only concerned with preservation of the\nunderlying data structures in the embedding and ignore sub-domain adaptation,\nwhich requires taking into account intra-class similarity and inter-class\ndissimilarity, thereby leading to negative transfer; 2). manifold learning is\nproposed across different feature/label spaces separately, thereby hindering\nunified comprehensive manifold learning. In this paper, starting from our\nprevious DGA-DA, we propose a novel DA method, namely Attention Regularized\nLaplace Graph-based Domain Adaptation (ARG-DA), to remedy the aforementioned\nissues. Specifically, by weighting the importance across different sub-domain\nadaptation tasks, we propose the Attention Regularized Laplace Graph for\nclass-aware DA, thereby generating the attention regularized DA. Furthermore,\nusing a specifically designed FEEL strategy, our approach dynamically unifies\nalignment of the manifold structures across different feature/label spaces,\nthus leading to comprehensive manifold learning. Comprehensive experiments are\ncarried out to verify the effectiveness of the proposed DA method, which\nconsistently outperforms the state-of-the-art DA methods on 7 standard DA\nbenchmarks, i.e., 37 cross-domain image classification tasks including object,\nface, and digit images. An in-depth analysis of the proposed DA method is also\ndiscussed, including sensitivity, convergence, and robustness.",
      published: "2022-10-15T02:58:57Z",
      updated: "2022-10-15T02:58:57Z",
      authors: [
        {
          name: "Lingkun Luo",
        },
        {
          name: "Liming Chen",
        },
        {
          name: "Shiqiang Hu",
        },
      ],
      links: ["", "", ""],
    },
    {
      id: "http://arxiv.org/abs/1604.00502v1",
      title:
        "Online Updating of Word Representations for Part-of-Speech Tagging",
      summary:
        "We propose online unsupervised domain adaptation (DA), which is performed\nincrementally as data comes in and is applicable when batch DA is not possible.\nIn a part-of-speech (POS) tagging evaluation, we find that online unsupervised\nDA performs as well as batch DA.",
      published: "2016-04-02T13:52:23Z",
      updated: "2016-04-02T13:52:23Z",
      authors: [
        {
          name: "Wenpeng Yin",
        },
        {
          name: "Tobias Schnabel",
        },
        {
          name: "Hinrich Schütze",
        },
      ],
      links: ["", ""],
    },
    {
      id: "http://arxiv.org/abs/1606.02796v1",
      title:
        "Sharp and Bright Photoluminescence Emission of Single Crystalline\n  Diacetylene Nanoparticles",
      summary:
        "Amorphous nanoparticles (NPs) of diacetylene (DA) molecules were prepared by\nusing a reprecipitation method. After crystallization through solvent-vapor\nannealing process, the highly crystalline DA NPs show different structural and\noptical characteristics compared with the amorphous DA NPs. The single crystal\nstructure of DA NPs was confirmed by high-resolution transmission electron\nmicroscopy (HR-TEM) and wide angle X-ray scattering (WAXS). The luminescence\ncolor and photoluminescence (PL) characteristics of the DA NPs were measured\nusing color charge-coupled device (CCD) images and high-resolution laser\nconfocal microscope (LCM). The crystalline DA NPs emit bright green light\nemission compared with amorphous DA NPs and the main PL peak of the crystalline\nDA NPs exhibits relative narrow and blue shift phenomena due to enhanced\ninteraction between DA molecular in the nano-size crystal structure.",
      published: "2016-06-09T01:10:55Z",
      updated: "2016-06-09T01:10:55Z",
      authors: [
        {
          name: "Seokho Kima",
        },
        {
          name: "Piao Xianlingb",
        },
        {
          name: "Hyeong Tae Kima",
        },
        {
          name: "Chunzhi Cuic",
        },
        {
          name: "Dong Hyuk Park",
        },
      ],
      links: ["", ""],
    },
    {
      id: "http://arxiv.org/abs/2310.14608v1",
      title:
        "CAD-DA: Controllable Anomaly Detection after Domain Adaptation by\n  Statistical Inference",
      summary:
        "We propose a novel statistical method for testing the results of anomaly\ndetection (AD) under domain adaptation (DA), which we call CAD-DA --\ncontrollable AD under DA. The distinct advantage of the CAD-DA lies in its\nability to control the probability of misidentifying anomalies under a\npre-specified level $\\alpha$ (e.g., 0.05). The challenge within this DA setting\nis the necessity to account for the influence of DA to ensure the validity of\nthe inference results. Our solution to this challenge leverages the concept of\nconditional Selective Inference to handle the impact of DA. To our knowledge,\nthis is the first work capable of conducting a valid statistical inference\nwithin the context of DA. We evaluate the performance of the CAD-DA method on\nboth synthetic and real-world datasets.",
      published: "2023-10-23T06:34:33Z",
      updated: "2023-10-23T06:34:33Z",
      authors: [
        {
          name: "Vo Nguyen Le Duy",
        },
        {
          name: "Hsuan-Tien Lin",
        },
        {
          name: "Ichiro Takeuchi",
        },
      ],
      links: ["", ""],
    },
    {
      id: "http://arxiv.org/abs/2401.10912v1",
      title:
        'Reply to "Comment on `Anomalous Reentrant 5/2 Quantum Hall Phase at\n  Moderate Landau-Level-Mixing Strength\' "',
      summary:
        "The proposed $\\mathcal{A}$ phase and the corresponding trial wavefunction\nproposed by Das \\emph{et al.} (PRL 131, 056202, 2023) for 5/2 state are argued\nto describe the fractional quantum Hall liquid state rather than a phase\nseparated or stripe or bubble state.",
      published: "2024-01-11T18:03:18Z",
      updated: "2024-01-11T18:03:18Z",
      authors: [
        {
          name: "Sudipto Das",
        },
        {
          name: "Sahana Das",
        },
        {
          name: "Sudhansu S. Mandal",
        },
      ],
      links: ["", "", ""],
    },
    {
      id: "http://arxiv.org/abs/2205.14606v1",
      title:
        "A General Multiple Data Augmentation Based Framework for Training Deep\n  Neural Networks",
      summary:
        "Deep neural networks (DNNs) often rely on massive labelled data for training,\nwhich is inaccessible in many applications. Data augmentation (DA) tackles data\nscarcity by creating new labelled data from available ones. Different DA\nmethods have different mechanisms and therefore using their generated labelled\ndata for DNN training may help improving DNN's generalisation to different\ndegrees. Combining multiple DA methods, namely multi-DA, for DNN training,\nprovides a way to boost generalisation. Among existing multi-DA based DNN\ntraining methods, those relying on knowledge distillation (KD) have received\ngreat attention. They leverage knowledge transfer to utilise the labelled data\nsets created by multiple DA methods instead of directly combining them for\ntraining DNNs. However, existing KD-based methods can only utilise certain\ntypes of DA methods, incapable of utilising the advantages of arbitrary DA\nmethods. We propose a general multi-DA based DNN training framework capable to\nuse arbitrary DA methods. To train a DNN, our framework replicates a certain\nportion in the latter part of the DNN into multiple copies, leading to multiple\nDNNs with shared blocks in their former parts and independent blocks in their\nlatter parts. Each of these DNNs is associated with a unique DA and a newly\ndevised loss that allows comprehensively learning from the data generated by\nall DA methods and the outputs from all DNNs in an online and adaptive way. The\noverall loss, i.e., the sum of each DNN's loss, is used for training the DNN.\nEventually, one of the DNNs with the best validation performance is chosen for\ninference. We implement the proposed framework by using three distinct DA\nmethods and apply it for training representative DNNs. Experiments on the\npopular benchmarks of image classification demonstrate the superiority of our\nmethod to several existing single-DA and multi-DA based training methods.",
      published: "2022-05-29T09:01:47Z",
      updated: "2022-05-29T09:01:47Z",
      authors: [
        {
          name: "Binyan Hu",
        },
        {
          name: "Yu Sun",
        },
        {
          name: "A. K. Qin",
        },
      ],
      links: ["", ""],
    },
    {
      id: "http://arxiv.org/abs/2112.07856v1",
      title:
        "Efficient high-dimensional variational data assimilation with\n  machine-learned reduced-order models",
      summary:
        "Data assimilation (DA) in the geophysical sciences remains the cornerstone of\nrobust forecasts from numerical models. Indeed, DA plays a crucial role in the\nquality of numerical weather prediction, and is a crucial building block that\nhas allowed dramatic improvements in weather forecasting over the past few\ndecades. DA is commonly framed in a variational setting, where one solves an\noptimization problem within a Bayesian formulation using raw model forecasts as\na prior, and observations as likelihood. This leads to a DA objective function\nthat needs to be minimized, where the decision variables are the initial\nconditions specified to the model. In traditional DA, the forward model is\nnumerically and computationally expensive. Here we replace the forward model\nwith a low-dimensional, data-driven, and differentiable emulator. Consequently,\ngradients of our DA objective function with respect to the decision variables\nare obtained rapidly via automatic differentiation. We demonstrate our approach\nby performing an emulator-assisted DA forecast of geopotential height. Our\nresults indicate that emulator-assisted DA is faster than traditional\nequation-based DA forecasts by four orders of magnitude, allowing computations\nto be performed on a workstation rather than a dedicated high-performance\ncomputer. In addition, we describe accuracy benefits of emulator-assisted DA\nwhen compared to simply using the emulator for forecasting (i.e., without DA).",
      published: "2021-12-15T03:25:55Z",
      updated: "2021-12-15T03:25:55Z",
      authors: [
        {
          name: "Romit Maulik",
        },
        {
          name: "Vishwas Rao",
        },
        {
          name: "Jiali Wang",
        },
        {
          name: "Gianmarco Mengaldo",
        },
        {
          name: "Emil Constantinescu",
        },
        {
          name: "Bethany Lusch",
        },
        {
          name: "Prasanna Balaprakash",
        },
        {
          name: "Ian Foster",
        },
        {
          name: "Rao Kotamarthi",
        },
      ],
      links: ["", ""],
    },
    {
      id: "http://arxiv.org/abs/2303.13296v2",
      title: "Porous plates at incidence",
      summary:
        "This paper investigates the effect of permeability on two-dimensional\nrectangular plates at incidences. The flow topology is investigated for\nReynolds number ($Re$) values between 30 and 90, and the forces on the plate\nare discussed for $Re=30$, where the wake is found to be steady for any value\nof the Darcy number ($Da$) and the flow incidence ($\\alpha$). At $Re=30$, for a\nplate normal to the stream and vanishing $Da$, the wake shows a vortex dipole\nwith a stagnation point on the plate surface. With increasing $Da$, the\nseparation between the vortex dipole and the plate increases; the vortex dipole\nshortens and is eventually annihilated at a critical $Da$. For any value of\n$Da$ below the critical one, the vortex dipole disappears with decreasing\n$\\alpha$. However, at low $Da$, the two saddle-node pairs merge at the same\n$\\alpha$, annihilating the dipole; while at high $Da$, they merge at different\n$\\alpha$, resulting in a single recirculating region for intermediate\nincidences. The magnitudes of lift, drag, and torque decrease with $Da$.\nNevertheless, there exists a range of $Da$ and $\\alpha$, where the magnitude of\nthe plate-wise force component increases with $Da$, driven by the shear on the\nplate's pressure side. Finally, the analysis of the fluid impulse suggests that\nthe lift and drag reduction with $Da$ are associated with the weakening of the\nleading and trailing edge shear layer, respectively. The present findings will\nbe directly beneficial in understanding the role of permeability on small\nporous wings.",
      published: "2023-03-23T14:27:36Z",
      updated: "2024-06-27T08:21:51Z",
      authors: [
        {
          name: "Chandan Bose",
        },
        {
          name: "Callum Bruce",
        },
        {
          name: "Ignazio Maria Viola",
        },
      ],
      links: ["", ""],
    },
    {
      id: "http://arxiv.org/abs/hep-ph/0004125v1",
      title: "Topics in Finite Temperature Field Theory",
      summary:
        "We discuss a few selected topics in finite temperature field theory.",
      published: "2000-04-13T19:02:43Z",
      updated: "2000-04-13T19:02:43Z",
      authors: {
        name: "Ashok Das",
      },
      links: ["", ""],
    },
    {
      id: "http://arxiv.org/abs/0804.4628v1",
      title: "Comment - Practical Data Protection",
      summary:
        "Recently, Rawat and Saxena proposed a method for protecting data using\n``Disclaimer Statement''. This paper presents some issues and several flaws in\ntheir proposal.",
      published: "2008-04-29T15:06:02Z",
      updated: "2008-04-29T15:06:02Z",
      authors: {
        name: "Manik Lal Das",
      },
      links: ["", ""],
    },
    {
      id: "http://arxiv.org/abs/1302.6950v2",
      title: "A Witt type formula",
      summary:
        "This paper investigates some combinatorial and algebraic properties of a Witt\ntype formula for graphs.",
      published: "2013-02-27T18:32:11Z",
      updated: "2013-03-04T18:32:50Z",
      authors: {
        name: "G. A. T. F. da Costa",
      },
      links: ["", ""],
    },
    {
      id: "http://arxiv.org/abs/1802.08077v1",
      title: "Discriminative Label Consistent Domain Adaptation",
      summary:
        "Domain adaptation (DA) is transfer learning which aims to learn an effective\npredictor on target data from source data despite data distribution mismatch\nbetween source and target. We present in this paper a novel unsupervised DA\nmethod for cross-domain visual recognition which simultaneously optimizes the\nthree terms of a theoretically established error bound. Specifically, the\nproposed DA method iteratively searches a latent shared feature subspace where\nnot only the divergence of data distributions between the source domain and the\ntarget domain is decreased as most state-of-the-art DA methods do, but also the\ninter-class distances are increased to facilitate discriminative learning.\nMoreover, the proposed DA method sparsely regresses class labels from the\nfeatures achieved in the shared subspace while minimizing the prediction errors\non the source data and ensuring label consistency between source and target.\nData outliers are also accounted for to further avoid negative knowledge\ntransfer. Comprehensive experiments and in-depth analysis verify the\neffectiveness of the proposed DA method which consistently outperforms the\nstate-of-the-art DA methods on standard DA benchmarks, i.e., 12 cross-domain\nimage classification tasks.",
      published: "2018-02-21T13:30:52Z",
      updated: "2018-02-21T13:30:52Z",
      authors: [
        {
          name: "Lingkun Luo",
        },
        {
          name: "Liming Chen",
        },
        {
          name: "Ying lu",
        },
        {
          name: "Shiqiang Hu",
        },
      ],
      links: ["", ""],
    },
    {
      id: "http://arxiv.org/abs/2002.00595v1",
      title:
        "On the Rudnick and Sarnak's Zeros of principal L-functions and Random\n  Matrix Theory",
      summary:
        "In this article, we have surveyed the result of Ze\\'ev Rudnick and Peter\nSarnak on the Zeros of principal L-function and Random Matrix Theory",
      published: "2020-02-03T08:30:06Z",
      updated: "2020-02-03T08:30:06Z",
      authors: {
        name: "Madhuparna Das",
      },
      links: ["", ""],
    },
    {
      id: "http://arxiv.org/abs/1611.01153v1",
      title:
        "On Perfectness of Intersection Graph of Ideals of $\\mathbb{Z}_n$",
      summary:
        "In this paper, we characterize the positive integers $n$ for which\nintersection graph of ideals of $\\mathbb{Z}_n$ is perfect.",
      published: "2016-11-03T17:27:09Z",
      updated: "2016-11-03T17:27:09Z",
      authors: {
        name: "Angsuman Das",
      },
      links: ["", "", ""],
    },
    {
      id: "http://arxiv.org/abs/2010.15764v2",
      title: "Domain adaptation under structural causal models",
      summary:
        "Domain adaptation (DA) arises as an important problem in statistical machine\nlearning when the source data used to train a model is different from the\ntarget data used to test the model. Recent advances in DA have mainly been\napplication-driven and have largely relied on the idea of a common subspace for\nsource and target data. To understand the empirical successes and failures of\nDA methods, we propose a theoretical framework via structural causal models\nthat enables analysis and comparison of the prediction performance of DA\nmethods. This framework also allows us to itemize the assumptions needed for\nthe DA methods to have a low target error. Additionally, with insights from our\ntheory, we propose a new DA method called CIRM that outperforms existing DA\nmethods when both the covariates and label distributions are perturbed in the\ntarget data. We complement the theoretical analysis with extensive simulations\nto show the necessity of the devised assumptions. Reproducible synthetic and\nreal data experiments are also provided to illustrate the strengths and\nweaknesses of DA methods when parts of the assumptions in our theory are\nviolated.",
      published: "2020-10-29T17:09:34Z",
      updated: "2021-11-24T04:26:51Z",
      authors: [
        {
          name: "Yuansi Chen",
        },
        {
          name: "Peter Bühlmann",
        },
      ],
      links: ["", ""],
    },
    {
      id: "http://arxiv.org/abs/2011.11635v2",
      title:
        "An elastic framework for ensemble-based large-scale data assimilation",
      summary:
        "Prediction of chaotic systems relies on a floating fusion of sensor data\n(observations) with a numerical model to decide on a good system trajectory and\nto compensate nonlinear feedback effects. Ensemble-based data assimilation (DA)\nis a major method for this concern depending on propagating an ensemble of\nperturbed model realizations.In this paper we develop an elastic, online,\nfault-tolerant and modular framework called Melissa-DA for large-scale\nensemble-based DA. Melissa-DA allows elastic addition or removal of compute\nresources for state propagation at runtime. Dynamic load balancing based on\nlist scheduling ensuresefficient execution. Online processing of the data\nproduced by ensemble members enables to avoid the I/O bottleneck of file-based\napproaches. Our implementation embeds the PDAF parallel DA engine, enabling the\nuse of various DA methods. Melissa-DA can support extra ensemble-based\nDAmethods by implementing the transformation of member background states into\nanalysis states. Experiments confirm the excellent scalability of Melissa-DA,\nrunning on up to 16,240 cores, to propagate 16,384 members for a regional\nhydrological critical zone assimilation relying on theParFlow model on a domain\nwith about 4 M grid cells.",
      published: "2020-11-21T11:23:43Z",
      updated: "2020-11-25T08:23:29Z",
      authors: [
        {
          name: "Sebastian Friedemann",
          affiliation: "DATAMOVE",
        },
        {
          name: "Bruno Raffin",
          affiliation: "DATAMOVE",
        },
      ],
      links: ["", ""],
    },
    {
      id: "http://arxiv.org/abs/2011.13081v2",
      title:
        "Computationally Assessing Diamond as an Ultrafast Pulse Shaper for High\n  Power Ultrawide Band Radar",
      summary:
        "Diamond holds promise to reshape ultrafast and high power electronics. One\nsuch solid-state device is the diode avalanche shaper (DAS), which functions as\nan ultrafast closing switch where closing is caused by the formation of the\nstreamer traversing the diode much faster than 10$^7$ cm/s. One of the most\nprominent applications of DAS is in ultrawide band (UWB) radio/radar. Here we\nsimulate a diamond-based DAS and compare the results to a silicon-based DAS.\nAll DAS were simulated in mixed mode as ideal devices using the drift-diffusion\nmodel. The simulations show that diamond DAS promises to outperform Si DAS when\nsharpening kilovolt nanosecond input pulse. The breakdown field and streamer\nvelocity ($\\sim$10 times larger in diamond as compared to those in Si) are\nlikely to be the major reasons enabling kV sub-50 ps switching using diamond\nDAS.",
      published: "2020-11-26T00:53:27Z",
      updated: "2023-07-14T17:34:55Z",
      authors: [
        {
          name: "Christopher C. Herrmann",
        },
        {
          name: "Joseph Croman",
        },
        {
          name: "Sergey V. Baryshev",
        },
      ],
      links: ["", ""],
    },
    {
      id: "http://arxiv.org/abs/1912.02298v1",
      title:
        "Gaussian Data-aided Sensing with Multichannel Random Access and Model\n  Selection",
      summary:
        "In this paper, we study data-aided sensing (DAS) for a system consisting of a\nbase station (BS) and a number of nodes, where the BS becomes a receiver that\ncollects measurements or data sets from the nodes that are distributed over a\ncell. DAS is an iterative data collection scheme that allows the BS to\nefficiently estimate a target signal (i.e., all nodes' measurements) with a\nsmall number of measurements (compared to random polling). In DAS, a set of\nnodes are selected in each round based on the data sets that are already\navailable at the BS from previous rounds for efficient data collection. We\nconsider DAS for measurements that are correlated Gaussian in this paper. The\nresulting DAS is referred to as Gaussian DAS. Using the mean squared error\n(MSE) criterion, in each round, the BS is able to choose a node that has a data\nset to minimize the MSE of the next round. Furthermore, we generalize Gaussian\nDAS in two different ways: i) with multiple parallel channels to upload\nmeasurements from nodes using random access; ii) with a model selection, where\na multi-armed bandit problem formulation is used to combine the model selection\nwith DAS.",
      published: "2019-12-04T23:11:00Z",
      updated: "2019-12-04T23:11:00Z",
      authors: {
        name: "Jinho Choi",
      },
      links: ["", ""],
    },
    {
      id: "http://arxiv.org/abs/2109.11603v1",
      title: "Document Automation Architectures and Technologies: A Survey",
      summary:
        "This paper surveys the current state of the art in document automation (DA).\nThe objective of DA is to reduce the manual effort during the generation of\ndocuments by automatically integrating input from different sources and\nassembling documents conforming to defined templates. There have been reviews\nof commercial solutions of DA, particularly in the legal domain, but to date\nthere has been no comprehensive review of the academic research on DA\narchitectures and technologies. The current survey of DA reviews the academic\nliterature and provides a clearer definition and characterization of DA and its\nfeatures, identifies state-of-the-art DA architectures and technologies in\nacademic research, and provides ideas that can lead to new research\nopportunities within the DA field in light of recent advances in artificial\nintelligence and deep neural networks.",
      published: "2021-09-23T19:12:26Z",
      updated: "2021-09-23T19:12:26Z",
      authors: [
        {
          name: "Mohammad Ahmadi Achachlouei",
        },
        {
          name: "Omkar Patil",
        },
        {
          name: "Tarun Joshi",
        },
        {
          name: "Vijayan N. Nair",
        },
      ],
      links: ["", ""],
    },
  ],
};
