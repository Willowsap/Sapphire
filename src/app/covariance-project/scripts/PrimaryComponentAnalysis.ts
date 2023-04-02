export class PrimaryComponentAnalysis {
    mean(x: Array<Array<number>>): Array<number> {
        let means = [];
        for (let j = 0; j < x[0].length; j++) {
            means[j] = this.singleMean(this.getColumn(x, j));
        }
        return means;
    }
    cov(x: Array<Array<number>>): Array<Array<number>> {
        let x_bar = this.mean(x);
        let K = [];
        for (let j = 0; j < x[0].length; j++) {
            let K_row = [];
            for(let k = 0; k < x[0].length; k++) {
                K_row[k] = this.singleCov(x, x_bar, j, k);
            }
            K[j] = K_row;
        }
        return K;
    }
    powerIteration(a: Array<Array<number>>, num_iter: number): [Array<number>, number] {
        let v = this.largestRow(a);
        for (let i = 0; i < num_iter; i++) {
            v = this.matrixVectorMultiply(a,v);
            v = this.vectorDivideByScalar(v, this.magnitude(v));
        }
        return [v, (this.dotProduct(this.matrixVectorMultiply(a, v), v) / this.dotProduct(v,v))];
    } 
    eig(a: Array<Array<number>>, num_components: number, num_iter: number): [Array<Array<number>>, Array<number>] {
        let w = [];
        let d = [];
        for (let i = 0; i < num_components; i++) {
            let powerResult = this.powerIteration(a, num_iter);
            d[i] = powerResult[1];
            w[i] = powerResult[0];
            a = this.matrixMinusMatrix(a, this.scaleMatrix(this.innerProduct(
                powerResult[0], powerResult[0]), powerResult[1]));
        }
        return [this.getTranspose(w), d];
    }
    pca(x: Array<Array<number>>, num_components: number, num_iter: number): Array<Array<number>> {
        let wd = this.eig(this.cov(x), num_components, num_iter)
        return this.matrixMultiply(this.matrixMinusVector(x, this.mean(x)), wd[0])
    }
    getColumn(a: Array<Array<number>>, j: number): Array<number> {
        let col = [];
        for(let i = 0; i < a.length; i++) col[i] = a[i][j];
        return col;
    }
    getTranspose(m: Array<Array<number>>): Array<Array<number>> {
        let mT = [];
        for (let i = 0; i < m[0].length; i++) mT[i] = this.getColumn(m, i);
        return mT;
    }
    innerProduct(v1: Array<number>, v2: Array<number>): Array<Array<number>> {
        if (v1.length != v2.length) {
            console.log("tried to multiply vectors of different lengths");
            return [];
        }
        let m = [];
        for (let i = 0; i < v1.length; i++) {
            let m_row = [];
            for (let j = 0; j < v2.length; j++) m_row[j] = v1[i] * v2[j];
            m[i] = m_row;
        }
        return m;
    }
    scaleMatrix(m: Array<Array<number>>, c: number): Array<Array<number>> {
        let a = [];
        for (let i = 0; i < m.length; i++) {
            a[i] = m[i]
            for (let j = 0; j < m[i].length; j++) {
                a[i][j] *= c;
            }
        }
        return a;
    }
    dotProduct(v1: Array<number>, v2: Array<number>): number {
        if (v1.length != v2.length) {
            return 0;
        }
        let product = 0;
        for (let i = 0; i < v1.length; i++) product += v1[i] * v2[i];
        return product;
    }
    matrixMultiply(a: Array<Array<number>>, b: Array<Array<number>>): Array<Array<number>> {
        if (a[0].length != b.length) {
            console.log("tried to multiply matrices with invalid dimensions");
            return [];
        }
        let product = [];
        for (let i = 0; i < a.length; i++) {
            let product_row = []
            for (let j = 0; j < b[0].length; j++) {
                product_row[j] = this.dotProduct(a[i], this.getColumn(b, j));
            }
            product[i] = product_row;
        }
        return product;
    }
    matrixVectorMultiply(m: Array<Array<number>>, v: Array<number>): Array<number> {
        if (m[0].length != v.length) {
            console.log("tried to multiply a matrix with a vector with invalid dimensions");
            return [];
        }
        let product = [];
        for (let i = 0; i < m.length; i++) {
            product[i] = this.dotProduct(m[i], v);
        }
        return product;
    }
    vectorDivideByScalar(v: Array<number>, c: number): Array<number> {
        for (let i = 0; i < v.length; i++) v[i] /= c;
        return v;
    }
    matrixMinusMatrix(a: Array<Array<number>>, b: Array<Array<number>>): Array<Array<number>> {
        if (a.length != b.length || a[0].length != b[0].length) {
            console.log("tried to subtract matrices with different dimensions");
            return [];
        }
        let c = [];
        for (let i = 0; i < a.length; i++) {
            let c_row = [];
            for (let j = 0; j < a[i].length; j++) {
                c_row[j] = a[i][j] - b[i][j];
            }
            c[i] = c_row;
        }
        return c;
    }
    matrixMinusVector(a: Array<Array<number>>, v: Array<number>): Array<Array<number>> {
        let b = [];
        for (let i = 0; i < a.length; i++) {
            let b_row = a[i];
            for (let j = 0; j < a[i].length; j++) {
                b_row[j] -= v[j];
            }
            b[i] = b_row;
        }
        return b;
    }
    magnitude(v: Array<number>): number {
        let sum = 0;
        for(let i = 0; i < v.length; i++) {
            sum += v[i] ** 2;
        }
        return sum ** 0.5;
    }
    singleMean(v: Array<number>): number {
        let sum = 0;
        for (let i = 0; i < v.length; i++)
            sum += v[i];
        return sum / v.length;
    }
    largestCol(x: Array<Array<number>>): Array<number> {
        let largest_mag = this.magnitude(this.getColumn(x, 0));
        let largest_mag_col = 0;
        for(let j = 0; j < x[0].length; j++) {
            let mag = this.magnitude(this.getColumn(x, j));
            if (mag > largest_mag) {
                largest_mag = mag;
                largest_mag_col = j;
            }
        }
        return x[largest_mag_col];
    }
    largestRow(x: Array<Array<number>>): Array<number> {
        let largest_mag = this.magnitude(x[0]);
        let largest_mag_row = 0;
        for(let i = 0; i < x[0].length; i++) {
            let mag = this.magnitude(x[i]);
            if (mag > largest_mag) {
                largest_mag = mag;
                largest_mag_row = i;
            }
        }
        return x[largest_mag_row];
    }
    singleCov(x: Array<Array<number>>, x_bar: Array<number>, j: number, k: number): number {
        let sum = 0;
        for(let i = 0; i < x.length; i++) {
            sum += ((x[i][j] -  x_bar[j]) * (x[i][k] - x_bar[k]));
        }
        return sum * (1 / (x.length - 1));
    }
    roundMatrix(m: Array<Array<number>>): Array<Array<number>> {
        for (let i = 0; i < m.length; i++) {
            for (let j = 0; j < m[i].length; j++) {
                m[i][j] = Math.round(m[i][j] * 100) / 100;
            }
        }
        return m;
    }
}
