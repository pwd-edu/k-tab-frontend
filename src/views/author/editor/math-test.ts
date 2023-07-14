const LATEX_SAMPLE_1 = String.raw`
Part A

\[
\int\limits_a^b x\,dx = \left.\frac{x^2}{2} \right|_a^b
\]
Part B

\begin{equation}
\iiint\limits_V f(x,y,z)\,dV = F
\end{equation}


\begin{equation}
\frac{dx}{dy}=x'=\lim_{h \to 0}\frac{f(x+h)-f(x)}{h}
\end{equation}


\begin{equation}
|x|=\begin{cases}
-x, & \text{if $x < 0$}\\
x, & \text{if $x \geq 0$}
\end{cases}
\end{equation}


\begin{equation}
F(x)= A_0 + \sum_{n=1}^N\left[ A_n\cos{\left(\frac{2\pi nx}{P}\right)}+B_n\sin{\left(\frac{2\pi nx}{P}\right)}\right]
\end{equation}


\begin{equation}
\sum_n \frac{1}{n^s}=\prod_p \frac{1}{1-\frac{1}{p^s}}
\end{equation}


\begin{equation*}         % equation* suppress equation numbering same for align*
m\ddot{x}+c\dot{x}+kx=F_0\sin(2\pi ft)
\end{equation*}


\begin{align*}
f(x)\quad &=\quad x^2 + 3x + 5x^2 +8 +6x\\
&=\quad 6x^2 +9x +8\\
&=\quad x(6x+9)+8
\end{align*}

$$
X=\frac{F_0}{k}\frac{1}{\sqrt{(1-r^2)^2+(2\zeta r)^2}}
$$

\begin{equation}
G_{\mu\nu} \equiv R_{\mu\nu}-\frac{1}{2}Rg_{\mu\nu}=\frac{8\pi G}{c^4}T_{\mu\nu}
\end{equation}\\

$$\mathrm{6CO_2+6H_2O \to C_6H_{12}O_6+6O_2}$$

$$\mathrm{SO_4^{2-}+Ba^{2+} \to BaSO_4 }$$

\begin{equation}
\begin{pmatrix}
a_{11}&a_{12}&\dots&a_{1n}\\
a_{21}&a_{22}&\dots&a_{2n}\\
\vdots&\vdots&\ddots&\vdots\\
a_{n1}&a_{n2}&\dots&a_{nn}
\end{pmatrix}
\begin{pmatrix}
v_{1}\\
v_{2}\\
\vdots\\
v_{n}
\end{pmatrix}
=
\begin{pmatrix}
w_{1}\\
w_{2}\\
\vdots\\
w_{n}
\end{pmatrix}
\end{equation}

\begin{equation}
\frac{\partial{\bf{u}}}{\partial{t}}+(\bf{u}\cdot\nabla)\bf{u}-\nu\nabla^2\bf(u)=-\nabla h
\end{equation}

\[             % This is preferred to the $$ environment
\alpha A \beta B \gamma \Gamma \delta \Delta \pi \Pi \omega \Omega
\]
`

const LATEX_SAMPLE_2 = `Inside a MathJax block element, one might use both Latex inline math, such
          as \\(x\\) or \\(\\frac{25x}{10} = 2^{10}\\), but then also switch
          to Latex display math, like
          \\[\\sum_{n = 100}^{1000}\\left(\\frac{10\\sqrt{n}}{n}\\right)\\]
          ... and then continue with inline math.`

export const LATEX_SAMPLES = [LATEX_SAMPLE_1, LATEX_SAMPLE_2]
