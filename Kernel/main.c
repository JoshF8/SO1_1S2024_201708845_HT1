#include <linux/module.h> // Needed by all modules
#include <linux/kernel.h> // Needed for KERN_INFO
#include <linux/mm.h>
#include <linux/sysinfo.h>
#include <linux/proc_fs.h>
#include <linux/seq_file.h>

// Variable para saber cada cuanto se va a ejecutar en ms
static unsigned long totalRAM = 0;
static unsigned long freeRAM = 0;

static bool aproximar = false;
module_param(aproximar, bool, S_IRUGO | S_IWUSR);
MODULE_PARM_DESC(aproximar, "Parametro para aproximar la ram al valor real");


static int test_show(struct seq_file *m, void *v){
    // obtener la memoria
    struct sysinfo memInfo;
    si_meminfo(&memInfo);
    // obtener la ram total y luego la usada
    totalRAM = memInfo.totalram * (memInfo.mem_unit >> 10);
    freeRAM = (memInfo.freeram  * memInfo.mem_unit / 1024 ) + (memInfo.bufferram * memInfo.mem_unit / 1024) + (memInfo.sharedram * memInfo.mem_unit / 1024 );
    if(aproximar){
        freeRAM += 2000000;
    }
    //la imprime en el archivo proc/testproc
    seq_printf(m, "{\"totalRAM\": %lu, \"freeRAM\": %lu}\n", totalRAM, freeRAM);
    return 0;
}

static int test_open(struct inode *inode, struct file *file){
    return single_open(file, test_show, NULL);
}
static const struct proc_ops test_fops = {
    .proc_open = test_open,
    .proc_read = seq_read,
    .proc_lseek = seq_lseek,
    .proc_release = single_release,
};


// Se ejecutara en el momento que se inicie el modulo
int init_module(void){
    printk(KERN_INFO "Iniciar modulo\n");

    // escribe en el archivo
    proc_create("testproc", 0, NULL, &test_fops);

    // Si no se devuelve 0 es porque dio error
    return 0;
}

// Se ejecutara en el momento que se elimine le modulo
void cleanup_module(void){
    printk(KERN_INFO "Eliminar modulo\n");
    remove_proc_entry("testproc", NULL);
}

// para firmarlo
MODULE_LICENSE("GPL");